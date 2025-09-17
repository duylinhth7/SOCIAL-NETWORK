import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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

    @Prop({type: [String], default: []})
    followers: string[]

    @Prop({type: [String], default: []})
    following: string[]

    @Prop({enum: ["active", "inactive"], default:"active"})
    status: string
}

export const UserSchema = SchemaFactory.createForClass(User);