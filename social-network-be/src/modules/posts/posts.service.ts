import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UploadService } from '../upload/upload.service';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    private readonly uploadService: UploadService,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  //Create Post
  async createPost(data: CreatePostDto) {
    try {
      let urls: any = [];
      if (data.images.length) {
        urls = await this.uploadService.uploadFiles(data.images);
      }
      data['images'] = urls;
      const newPost = await this.postModel.create(data);
      return newPost;
    } catch (error) {
      console.log('Lỗi!');
    }
  }

  //Get Post Feed
  // type dùng để xem lấy ở feed thì public, còn trong prf của chính user đó thì lấy all
  async getPostFeed(page: number, limit: number, type: string) {
    try {
      const skip = (page - 1) * limit;

      if (type == 'feed') {
        const post = await this.postModel
          .find({
            visibility: 'public',
          })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);
        return post;
      } else {
        const post = await this.postModel
          .find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);
        return post;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
