import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getProfile(@Req() req: any, @Param("id") id: string){
    if(req.user.id === id){
      return req.user
    };
    return this.usersService.findById(id);
  }

}
