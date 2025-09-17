import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModule: Model<User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  //ValidateUser
  async validateUser(email:string, password:string) {
    const user = await this.userService.findOne(email);
    if(!user){
      throw new UnauthorizedException("Thông tin email không hợp lệ!")
    };
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
      return user;
    }
  }
  //End ValidateUser

  //Register account
  async register(createAuthDto: CreateAuthDto) {
    try {
      const exitsEmail = await this.userModule.findOne({
        email: createAuthDto.email,
      });
      //Check email trong Db
      if (exitsEmail) {
        throw new BadRequestException('Email đã tồn tại!');
      }
      //End check email trong Db

      // MÃ hóa pw
      const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
      createAuthDto['password'] = hashedPassword;
      // End mã hóa pw

      //Lưu thông tin vào DB
      const user = await this.userModule.create(createAuthDto);
      return this.login(user);
    } catch (error) {
      throw error;
    }
  }
  //End register Account

  // //Login
  async login(user: any){
    const payload = {sub: user["_id"], email: user["email"]};
    return {
      access_token: await this.jwtService.sign(payload)
    }
    
  }
  //End login
}
