import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class forgetPasswordAuthDto {
  @IsEmail({}, { message: 'Vui lòng nhập email hợp lệ!' })
  email: string;
}
