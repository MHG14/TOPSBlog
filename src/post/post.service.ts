import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Comment, Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddPostDto, EditPostDto } from './dto'
@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPosts(): Promise<Array<Post>> {
    return await this.prisma.post.findMany();
  }

  async getPost(postId: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException('post not found');
    }
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

    if (post.authorId !== authorId) {
      throw new ForbiddenException('you are not allowed to do this operation');
    }

    const updatedPost = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: dto,
    });
    return updatedPost;
  }

  async deletePost(postId: number): Promise<{ msg: string }> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      throw new NotFoundException('post not found');
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
