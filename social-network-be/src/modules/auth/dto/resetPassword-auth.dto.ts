import { IsString, MinLength } from "class-validator";

export class ResetPasswordAuthDto{
    
    @IsString({message: "Vui lòng nhập đầy đủ thông tin"})
    @MinLength(8)
    password: string

    @IsString({message: "Vui lòng nhập đầy đủ thông tin"})
    @MinLength(8)
    confirmPassword: string
    
}