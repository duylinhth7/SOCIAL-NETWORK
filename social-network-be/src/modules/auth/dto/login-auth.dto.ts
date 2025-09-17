import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
    @IsEmail({}, { message: "Vui lòng nhập email hợp lệ!" })
    email: string;

    @IsString({ message: "Vui lòng nhập mật khẩu!" })
    password: string;
}
