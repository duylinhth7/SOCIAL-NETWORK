import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() data:CreateAuthDto){
    return this.authService.register(data);
  }

  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@Req() req:any){
    return this.authService.login(req.user)
  }
}
