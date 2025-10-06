import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<RoomChat>;
@Schema({timestamps: true})
export class RoomChat{
    @Prop()
    title: string;

    @Prop()
    avatar: string;

    @Prop()
    typeRoom: string;

    @Prop()
    status: string;

    @Prop({type: [String]})
    users: string[];
}

export const RoomChatSchema = SchemaFactory.createForClass(RoomChat);