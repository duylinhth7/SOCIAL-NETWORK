import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ChatDocument = HydratedDocument<Chat>;
@Schema({timestamps: true})
export class Chat{
    @Prop()
    user_id: string;

    @Prop()
    message: string;

    @Prop()
    roomChat_id: string;

    @Prop({type: [String], default:[]})
    images: string[];

    @Prop({default: false})
    isRead: Boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);