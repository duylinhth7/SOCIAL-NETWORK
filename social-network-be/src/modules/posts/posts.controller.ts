import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  @Post("/create")
  createPost(
    @UploadedFiles() images: Express.Multer.File,
    @Body() data: CreatePostDto,
  ) {
    if(images){
      data["images"] = images
    }
    return this.postsService.createPost(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/feed")
  // type dùng để xem lấy ở feed thì public, còn trong prf của chính user đó thì lấy all
  getPostFeed(@Query("page") page:number, @Query("limit") limit:number, @Query("type") type: string){
    return this.postsService.getPostFeed(page, limit, type);
  }
}
