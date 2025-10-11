import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { forgetPasswordAuthDto } from './dto/forgetPassword-auth.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ResetPasswordAuthDto } from './dto/resetPassword-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Đăng kí
  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  register(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() data: CreateAuthDto,
  ) {
    if (avatar) {
      data['avatar'] = avatar;
    }
    return this.authService.register(data);
  }

  //Đăng nhập
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  //Get info me
  @UseGuards(JwtAuthGuard)
  @Get("/me")
  async getProfile(@Req() req:any) {
    return req.user
  }

  //Quên mật khẩu
  @Post('/forget-password')
  async forgetPassword(@Body() data: forgetPasswordAuthDto) {
    const email: string = data.email;
    return this.authService.forgetPassword(email);
  }

  @Post('/forget-password/otp')
  async checkOtp(@Body() data: any) {
    return this.authService.checkOtp(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/reset-password')
  async resetPassword(@Req() req:any, @Body() data: ResetPasswordAuthDto) {
    return this.authService.resetPassword(req.user, data)
  }
}
