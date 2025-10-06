import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UploadService } from '../upload/upload.service';
import { generateOtp } from '../../helpers/generate';
import { ForgetPassword } from 'src/schemas/forgetPassword.schema';
import { ResetPasswordAuthDto } from './dto/resetPassword-auth.dto';
import { sendMail } from 'src/helpers/sendMail';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(ForgetPassword.name)
    private forgetPasswordModel: Model<ForgetPassword>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly uploadService: UploadService,
  ) {}

  //ValidateUser
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Thông tin email không hợp lệ!');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
  }
  //End ValidateUser

  //Register account
  async register(createAuthDto: CreateAuthDto) {
    try {
      const exitsEmail = await this.userModel.findOne({
        email: createAuthDto.email,
      });
      //Check email trong Db
      if (exitsEmail) {
        throw new BadRequestException('Email đã tồn tại!');
      }
      //Kiểm tra xem người dùng có upload avatar không
      if (createAuthDto.avatar) {
        const urlImage = await this.uploadService.uploadFile(
          createAuthDto.avatar,
        );
        createAuthDto['avatar'] = urlImage;
      }
      // MÃ hóa pw
      const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
      createAuthDto['password'] = hashedPassword;

      // //Lưu thông tin vào DB
      const user = await this.userModel.create(createAuthDto);
      return this.login(user);
    } catch (error) {
      throw error;
    }
  }

  //Login
  async login(user: any) {
    const payload = { email: user['email'] };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }

  //ForgetPassword
  async forgetPassword(email: string) {
    try {
      const exitsEmail = await this.userService.findOne(email);
      if (!exitsEmail) {
        throw new NotFoundException('Email không hợp lệ!');
      }
      const otp = generateOtp();
      this.forgetPasswordModel.create({ email, otp });
      //Gửi mail xác nhận OTP;
      const subject = 'Mã OTP xác minh đặt lại mật khẩu!';
      const html = `
        <div style="max-width: 500px; margin: 0 auto; padding: 20px; 
              border: 1px solid #e0e0e0; border-radius: 8px; 
              background-color: #f9f9f9; font-family: Arial, sans-serif; 
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); color: #333;">
            <h2 style="text-align: center; color: #007BFF;">Mã OTP Xác Minh</h2>
            <p>Xin chào,</p>
            <p>Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
            <p style="margin: 16px 0;">Vui lòng sử dụng mã OTP bên dưới để xác minh yêu cầu:</p>
            <div style="text-align: center; margin: 24px 0;">
            <span style="display: inline-block; padding: 12px 24px; 
                        font-size: 24px; font-weight: bold; 
                        background-color: #e6f0ff; color: #007BFF; 
                        border-radius: 6px; letter-spacing: 2px;">
                ${otp}
            </span>
            </div>
            <p><strong>Lưu ý:</strong> Mã OTP chỉ có hiệu lực trong vòng <strong>5 phút</strong>.</p>
            <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email.</p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 14px; color: #666; text-align: center;">
            <b>Trân trọng!</b>
            </p>
        </div>
        `;
      return sendMail(email, subject, html);
    } catch (error) {
      return error;
    }
  }

  //Check Opt
  async checkOtp(data: any) {
    try {
      const existOtp = await this.forgetPasswordModel.findOne({
        email: data.email,
        otp: data.otp,
      });
      if (!existOtp) {
        throw new NotFoundException(
          'Mã OTP bạn vừa nhập không hợp lệ hoặc đã hết hạn!',
        );
      }
      return this.login(data);
    } catch (error) {
      return error;
    }
  }

  //ResetPassWord
  async resetPassword(data: ResetPasswordAuthDto) {
    try {
      if (data.password !== data.confirmPassword) {
        throw new BadRequestException('ConfirmPassword không giống password!');
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      return await this.userModel.updateOne({
        password: hashedPassword,
      });
    } catch (error) {
      return error;
    }
  }
}
