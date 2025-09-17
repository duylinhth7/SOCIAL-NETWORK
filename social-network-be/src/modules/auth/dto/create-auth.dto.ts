import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {
    @IsString({ message: "Vui lòng nhập họ tên!" })
    fullname: string;

    @IsEmail({}, { message: "Vui lòng nhập email hợp lệ!" })
    email: string;

    @IsString({ message: "Vui lòng nhập mật khẩu!" })
    password: string;
}
