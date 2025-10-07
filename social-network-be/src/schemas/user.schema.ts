import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User{
    @Prop()
    fullname: string;

    @Prop({unique: true})
    email: string;  

    @Prop()
    password: string;

    @Prop()
    avatar: string;

    @Prop()
    description: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    followers: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    followings: Types.ObjectId[];

    @Prop({enum: ["active", "inactive"], default:"active"})
    status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
