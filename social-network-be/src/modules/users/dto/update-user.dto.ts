import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  fullname?: string;


  @IsOptional()
  @IsString()
  avatar?: any;


  @IsOptional()
  @IsString()
  description?: string;

}
