import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModule: Model<User>,){};

  async findOne(email:string){
    const user = await this.userModule.findOne({email: email}).select("-password");
    if(!user){
      throw new UnauthorizedException("Email không hợp lệ!");
    };
    return user;
  }

  async findById(id: string){
    const user = await this.userModule.findOne({_id: id}).select("-password");
    if(!user){
      throw new NotFoundException("Không tìm thấy user hợp lệ!")
    };
    return user;
  }
}
