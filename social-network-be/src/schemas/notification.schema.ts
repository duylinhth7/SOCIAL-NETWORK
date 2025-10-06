import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NotificationDocument = HydratedDocument<Notification>;
@Schema({timestamps: true})
export class Notification{
    @Prop()
    user_id: string;

    @Prop()
    type: string;

    @Prop()
    post_id: string;

    @Prop()
    fromUser_id: string;

    @Prop()
    comment_id: string;

    @Prop()
    message: string;

    @Prop({default: false})
    isRead: Boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);