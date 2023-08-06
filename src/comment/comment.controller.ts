import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { GetUser, Roles } from '../auth/decorator';
import { Role } from '../auth/enum/roles.enum';
import { JwtGuard } from '../auth/guard';
import { CommentService } from './comment.service';
import { CommentResponseType } from './dto/comment-response.type';
import { CommentDto } from './dto/comment.dto';
import { DeletedCommentResponse } from './dto/deleted-comment-response.type';

@UseInterceptors(CacheInterceptor)
@UseGuards(JwtGuard)
@Controller('comments')
export class CommentController {
  private readonly logger = new Logger(CommentController.name);

  constructor(private commentService: CommentService) {}

  @Get()
  @ApiOkResponse({
    description: 'retrieved list of comments as response',
    type: [CommentResponseType],
  })

  @Roles(Role.ADMIN)
  getComments() {
    try {
      return this.commentService.getComments();
    } catch (error) {
      this.logger.warn(error.message);
      throw error;
    }
  }

  @Get(':commentId')
  @ApiOkResponse({
    description: 'retrieved comment as response',
    type: CommentResponseType,
  })
  getComment(@Param('commentId', ParseIntPipe) commentId: number, @GetUser("id", ParseIntPipe) userId: number) {
    try {
      return this.commentService.getComment(commentId, userId);
    } catch (error) {
      this.logger.warn(error.message);
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
      this.logger.warn(error.message);
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
      this.logger.warn(error.message);
      throw error;
    }
  }

  @Delete(':commentId')
  @ApiOkResponse({
    description: 'deleted post response message',
    type: DeletedCommentResponse,
  })
  deleteComment(@Param('commentId', ParseIntPipe) commentId: number, @GetUser("id", ParseIntPipe) userId: number) {
    try {
      return this.commentService.deleteComment(commentId, userId);
    } catch (error) {
      this.logger.warn(error.message);
      throw error;
    }
  }
}
