import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Comment } from '@prisma/client';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async checkIfAdmin(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user.role === 'ADMIN') return true;
    return false;
  }
  async addComment(
    dto: CommentDto,
    userId: number,
    postId: number,
  ): Promise<Comment> {
    return await this.prisma.comment.create({
      data: {
        ...dto,
        userId,
        postId,
      },
    });
  }

  async getComments(): Promise<Array<Comment>> {
    const comments = await this.prisma.comment.findMany();
    await this.cacheManager.set('get-comments', comments);
    const cachedItem = await this.cacheManager.get('get-comments');
    console.log(cachedItem);

    return comments;
  }

  async getComment(commentId: number, userId: number): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    if (!this.checkIfAdmin(userId)) {
      if (comment.userId !== userId) {
        throw new ForbiddenException(
          'you are not allowed to do this operation',
        );
      }
    }

    await this.cacheManager.set('get-comment', comment);
    const cachedItem = await this.cacheManager.get('get-comment');
    console.log(cachedItem);

    return comment;
  }

  async editComment(
    dto: CommentDto,
    userId: number,
    commentId: number,
  ): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    if (!this.checkIfAdmin(userId)) {
      if (comment.userId !== userId) {
        throw new ForbiddenException(
          'you are not allowed to do this operation',
        );
      }
    }

    const updatedComment = await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: dto,
    });
    return updatedComment;
  }

  async deleteComment(
    commentId: number,
    userId: number,
  ): Promise<{ msg: string }> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new NotFoundException('comment not found');
    }

    if (!this.checkIfAdmin(userId)) {
      if (comment.userId !== userId) {
        throw new ForbiddenException(
          'you are not allowed to do this operation',
        );
      }
    }

    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return {
      msg: 'comment deleted successfully',
    };
  }
}
