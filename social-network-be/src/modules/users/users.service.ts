import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModule: Model<User>,){};

  async findOne(email:string){
    const user = await this.userModule.findOne({email: email});
    if(!user){
      throw new UnauthorizedException("Email không hợp lệ!");
    };
    return user;
  }
}
