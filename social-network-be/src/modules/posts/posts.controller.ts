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
  Req,
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
  @Post('/create')
  createPost(
    @Req() req: any,
    @UploadedFiles() images: Express.Multer.File,
    @Body() data: CreatePostDto,
  ) {
    if (images) {
      data['images'] = images;
    }
    return this.postsService.createPost(req.user, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/feed')
  // type dùng để xem lấy ở feed thì public, còn trong prf của chính user đó thì lấy all
  getPostFeed(
    @Req() req: any,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('type') type: string,
  ) {
    return this.postsService.getPostFeed(req.user, page, limit, type);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getPostDetail(@Req() req: any, @Param('id') id: string) {
    return this.postsService.getPostDetail(req.user, id);
  }


  @UseInterceptors(FilesInterceptor('images'))
  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  updatePost(
    @Req() req: any,
    @Param('id') id: string,
    @Body() data: any,
    @UploadedFiles() images: Express.Multer.File,
  ) {
    if(images) data["images"] = images;
    return this.postsService.updatePost(req.user, id, data);
  };

  @UseGuards(JwtAuthGuard)
  @Delete("/delete/:id")
  deletePost(@Req() req:any, @Param("id") id: string){
    return this.postsService.deletePost(req.user, id);
  }


  @UseGuards(JwtAuthGuard)
  @Post("/reactions/:id")
  reactionsPost(@Req() req: any, @Param("id") id:string, @Body() data:any){
    return this.postsService.reactionsPost(req.user, id, data);
  }


  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  @Post("/comment/:id")
  commentPost(@Req() req:any, @Param("id") id:string, @Body() data:any, @UploadedFile() image: Express.Multer.File){
    return this.postsService.commentPost(req.user, id, data, image)
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/comment/delete/:id")
  deleteComment(@Req() req:any, @Param("id") id:string){
    return this.postsService.deleteComment(req.user, id)
  }

  @UseGuards(JwtAuthGuard)
  @Get("/comment/:id")
  getAllComment(@Req() req:any, @Param("id") id:string){
    return this.postsService.getAllComment(req.user, id);
  }


}
