import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<Comment>;

@Schema({timestamps: true})
export class Comment{
    @Prop()
    post_id: string;

    @Prop()
    user_id: string;

    @Prop()
    content: string;

    @Prop({type: [String], default: []})
    images: string[];

    @Prop({type: [String], default: []})
    likes: String[]

    @Prop()
    toxic: Boolean
}

export const PostSchema = SchemaFactory.createForClass(Comment)