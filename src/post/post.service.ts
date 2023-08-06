import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Comment, Post } from '@prisma/client';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { AddPostDto, EditPostDto } from './dto';
@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async checkIfAdmin(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user.role === 'ADMIN') return true;
    return false;
  }

  async getPosts(): Promise<Array<Post>> {
    const posts = await this.prisma.post.findMany();
    await this.cacheManager.set("get-posts", posts)
    const cachedItem = await this.cacheManager.get("get-posts")
    console.log(cachedItem)
    return posts
  }

  async getPost(postId: number, userId: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException('post not found');
    }
    if (!this.checkIfAdmin(userId)) {
      if (post.authorId !== userId) {
        throw new ForbiddenException(
          'you are not allowed to do this operation',
        );
      }
    }
    await this.cacheManager.set("get-post", post)
    const cachedItem = await this.cacheManager.get("get-post")
    console.log(cachedItem)
    return post;
  }

  async addPost(dto: AddPostDto, authorId: number): Promise<Post> {
    return await this.prisma.post.create({
      data: {
        authorId,
        ...dto,
      },
    });
  }

  async editPost(
    dto: EditPostDto,
    authorId: number,
    postId: number,
  ): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException('post not found');
    }

    if (!this.checkIfAdmin(authorId)) {
      if (post.authorId !== authorId) {
        throw new ForbiddenException(
          'you are not allowed to do this operation',
        );
      }
    }

    const updatedPost = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: dto,
    });
    return updatedPost;
  }

  async deletePost(postId: number, authorId): Promise<{ msg: string }> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      throw new NotFoundException('post not found');
    }

    if (!this.checkIfAdmin(authorId)) {
      if (post.authorId !== authorId) {
        throw new ForbiddenException(
          'you are not allowed to do this operation',
        );
      }
    }

    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return {
      msg: 'post deleted successfully',
    };
  }
}
