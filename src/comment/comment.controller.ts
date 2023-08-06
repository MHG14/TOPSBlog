import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@UseGuards(JwtGuard)
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  getComments() {
    try {
      return this.commentService.getComments();
    } catch (error) {
      throw error;
    }
  }

  @Get(':commentId')
  getComment(@Param('commentId', ParseIntPipe) commentId: number) {
    try {
      return this.commentService.getComment(commentId);
    } catch (error) {
      throw error;
    }
  }

  @Post(':postId')
  addComment(
    @Body() dto: CommentDto,
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    try {
      return this.commentService.addComment(dto, userId, postId);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':commentId')
  editComment(
    @Body() dto: CommentDto,
    @GetUser('id') userId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    try {
      return this.commentService.editComment(dto, userId, commentId);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':commentId')
  deleteComment(@Param('commentId', ParseIntPipe) commentId: number) {
    try {
      return this.commentService.deleteComment(commentId);
    } catch (error) {
      throw error;
    }
  }
}
