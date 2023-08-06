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
import { AddPostDto, EditPostDto } from './dto';
import { PostService } from './post.service';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  // posts' controllers
  @Get()
  getPosts() {
    try {
      return this.postService.getPosts();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) postId: number) {
    try {
      return this.postService.getPost(postId);
    } catch (error) {
        throw error
    }
  }

  @Post()
  addPost(@Body() dto: AddPostDto, @GetUser('id') authorId: number) {
    try {
      return this.postService.addPost(dto, authorId);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':postId')
  editPost(
    @Body() dto: EditPostDto,
    @GetUser('id') authorId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    try {
      return this.postService.editPost(dto, authorId, postId);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':postId')
  deletePost(@Param('postId', ParseIntPipe) postId: number) {
    try {
      return this.postService.deletePost(postId);
    } catch (error) {
      throw error;
    }
  }
}
