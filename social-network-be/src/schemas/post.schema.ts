import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type PostDocument = HydratedDocument<Post>;
@Schema({ timestamps: true })
export class Post {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: User; // hoặc: user_id: Types.ObjectId

  @Prop()
  content: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: 'public' })
  visibility: string;

  @Prop({ type: [String], default: [] })
  likes: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
