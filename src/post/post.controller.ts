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
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetUser, Roles } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { AddPostDto, EditPostDto } from './dto';
import { Post as PostType } from '@prisma/client';
import { PostService } from './post.service';
import { PostResponseType } from './dto/post-response.type';
import { DeletedPostResponse } from './dto/deleted-post-response.type';
import { Role } from '../auth/enum/roles.enum';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  private readonly logger = new Logger(PostController.name);
  constructor(private postService: PostService) {}

  // posts' controllers
  @Get()
  @ApiOkResponse({
    description: 'retrieved list of posts as response',
    type: [PostResponseType],
  })
  @Roles(Role.ADMIN)
  getPosts() {
    try {
      return this.postService.getPosts();
    } catch (error) {
      this.logger.warn(error.message);
      throw error;
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'retrieved post as response',
    type: PostResponseType,
  })
  getPost(@Param('id', ParseIntPipe) postId: number, @GetUser("id") authorId: number) {
    try {
      return this.postService.getPost(postId, authorId);
    } catch (error) {
      this.logger.warn(error.message);
      throw error;
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'created post as response',
    type: PostResponseType,
  })
  addPost(@Body() dto: AddPostDto, @GetUser('id') authorId: number) {
    try {
      return this.postService.addPost(dto, authorId);
    } catch (error) {
      this.logger.warn(error.message);
      throw error;
    }
  }

  @Patch(':postId')
  @ApiOkResponse({
    description: 'edited post as response',
    type: PostResponseType,
  })
  editPost(
    @Body() dto: EditPostDto,
    @GetUser('id') authorId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    try {
      return this.postService.editPost(dto, authorId, postId);
    } catch (error) {
      this.logger.warn(error.message);
      throw error;
    }
  }

  @Delete(':postId')
  @ApiOkResponse({
    description: 'deleted post response message',
    type: DeletedPostResponse,
  })
  deletePost(@Param('postId', ParseIntPipe) postId: number, @GetUser("id") authorId: number) {
    try {
      return this.postService.deletePost(postId, authorId);
    } catch (error) {
      this.logger.warn(error.message);
      throw error;
    }
  }
}
