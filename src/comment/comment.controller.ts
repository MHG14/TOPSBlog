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
import { ApiCreatedResponse, ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CommentService } from './comment.service';
import { CommentResponseType } from './dto/comment-response.type';
import { CommentDto } from './dto/comment.dto';
import { DeletedCommentResponse } from './dto/deleted-comment-response.type';

@UseGuards(JwtGuard)
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  @ApiOkResponse({
    description: 'retrieved list of comments as response',
    type: [CommentResponseType],
  })
  getComments() {
    try {
      return this.commentService.getComments();
    } catch (error) {
      throw error;
    }
  }

  @Get(':commentId')
  @ApiOkResponse({
    description: 'retrieved comment as response',
    type: CommentResponseType,
  })
  getComment(@Param('commentId', ParseIntPipe) commentId: number) {
    try {
      return this.commentService.getComment(commentId);
    } catch (error) {
      throw error;
    }
  }

  @Post(':postId')
  @ApiCreatedResponse({
    description: 'created comment as response',
    type: CommentResponseType,
  })
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
  @ApiOkResponse({
    description: 'edited comment as response',
    type: CommentResponseType,
  })
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
  @ApiOkResponse({
    description: 'deleted post response message',
    type: DeletedCommentResponse,
  })
  deleteComment(@Param('commentId', ParseIntPipe) commentId: number) {
    try {
      return this.commentService.deleteComment(commentId);
    } catch (error) {
      throw error;
    }
  }
}
