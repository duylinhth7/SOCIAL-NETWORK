import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ForgetPasswordDocument = HydratedDocument<ForgetPassword>;

@Schema({timestamps: true})
export class ForgetPassword{
    @Prop()
    email: String;

    @Prop({unique: true})
    otp: String;

    @Prop({default: ()=> new Date() ,expires: 300})
    expireAt: Date;
}

export const ForgetPasswordSchema = SchemaFactory.createForClass(ForgetPassword)