import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UploadService } from '../upload/upload.service';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schemas/post.schema';
import mongoose, { Model, Types } from 'mongoose';
import { Comment } from 'src/schemas/comment.schema';

@Injectable()
export class PostsService {
  constructor(
    private readonly uploadService: UploadService,
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  //Create Post
  async createPost(user: any, data: CreatePostDto) {
    try {
      data['user_id'] = user._id;
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
  // type dùng để xem lấy ở feed thì public, còn trong prf của chính user đó thì lấy myprofile
  async getPostFeed(user: any, page: number, limit: number, type: string) {
    try {
      const skip = (page - 1) * limit;
      let posts: any = [];
      switch (type) {
        case 'feed':
          posts = await this.postModel
            .find({
              $or: [
                { visibility: 'public' },
                {
                  $and: [
                    { user_id: { $in: user.followings } },
                    { visibility: { $ne: 'private' } },
                  ],
                },
                { user_id: user._id },
              ],
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
          break;
        case 'myprofile':
          posts = await this.postModel
            .find({ user_id: user._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
          break;
      }
      return posts;
    } catch (error) {
      console.log(error);
    }
  }

  //Get Post Detail
  async getPostDetail(user: any, id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('ID bài viết không hợp lệ');
      }
      const postDetail = await this.postModel.findOne({
        $or: [
          {
            _id: id,
            visibility: 'public',
          },
          {
            _id: id,
            user_id: user.id,
          },
        ],
      });
      if (!postDetail) {
        throw new NotFoundException('Không tìm thấy bài viết hợp lệ');
      }
      return postDetail;
    } catch (error) {
      throw error;
    }
  }

  //UpdatePost
  async updatePost(user: any, id: string, data: any) {
    try {
      let urls: any = [];
      if (data.images.length > 0) {
        urls = await this.uploadService.uploadFiles(data.images);
        data['images'] = urls;
      }
      if (data['images'].length === 0) delete data['images'];
      const postUpdated = await this.postModel.updateOne(
        {
          _id: id,
          user_id: user._id,
        },
        {
         $set: data
        },
      );
      return postUpdated;
    } catch (error) {
      throw error;
    }
  }

  //deletePost
  async deletePost(user:any, id: string){
    try {
      const deletePost = await this.postModel.deleteOne({
        _id: id,
        user_id: user.id
      });
      return deletePost;
    } catch (error) {
      throw error;
    }
  }

  //LikePost
  async reactionsPost(user:any, id:string, data:any){
    try {
      const type:string = data.type;
      enum ReactionType{
        LIKE= "like",
        UNLIKE= "unlike"
      }
      switch(type){
        case ReactionType.LIKE:
          await this.postModel.updateOne({
            _id: id
          }, {
            $addToSet: {likes: user._id}
          });
          break;
        case ReactionType.UNLIKE:
          await this.postModel.updateOne({
            _id: id
          }, {
            $pull: {likes: user._id}
          });
          break
        default:
          throw new Error("Invalid reaction type");
      }
      const post = await this.postModel.findById(id);
      return post;
    } catch (error) {
      throw error;
    }
  }

  //Comment post
  async commentPost(user:any, id:string, data:any, image:any){
    try {
      let url:any = [];
      const content:string = data.content;
      data["user_id"] = user._id;
      if(image){
        url = await this.uploadService.uploadFile(image);
      };

      //Phần predict toxic
      //...
      //End Phần predict toxic
      
      const comment = {
        post_id: id,
        user_id: user._id,
        content: content,
        image: url
      }
      const newComment = await this.commentModel.create(comment);
      return newComment
    } catch (error) {
      throw error;
    }
  }

  //Delete Comment
  async deleteComment(user:any, id:string){
    try {
      const deleted = await this.commentModel.deleteOne({
        _id: id,
        user_id: user._id
      });
      return deleted;
    } catch (error) {
      throw error
    }
  }

  // Get all comment
  async getAllComment(user:any, id:string){
    try {
      const comments = await this.commentModel.find({post_id: id});
      return comments;
    } catch (error) {
      throw error
    }
  }
}
