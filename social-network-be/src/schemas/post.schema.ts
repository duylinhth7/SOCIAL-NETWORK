import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<Post>;
@Schema({timestamps: true})
export class Post{
    @Prop()
    user_id: string

    @Prop()
    content: string

    @Prop({type: [String], default:[]})
    images: string[]

    @Prop({type: [String], default: []})
    tags: string[]

    @Prop({default: "public"})
    visable: string

    @Prop({type: [String], default: []})
    likes: string[]
}

export const PostSchema = SchemaFactory.createForClass(Post)