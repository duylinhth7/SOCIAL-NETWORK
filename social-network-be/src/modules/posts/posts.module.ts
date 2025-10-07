import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UploadModule } from '../upload/upload.module';
import { Post, PostSchema } from 'src/schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    UploadModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
})
export class PostsModule {}
