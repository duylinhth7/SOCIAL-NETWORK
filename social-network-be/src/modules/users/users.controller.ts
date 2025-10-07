import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/profile/:id')
  getProfile(@Req() req: any, @Param('id') id: string) {
    if (req.user.id === id) {
      return req.user;
    }
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch('/update/:id')
  updateUser(
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req: any,
    @Body() data: UpdateUserDto,
  ) {
    data["avatar"] = avatar
    return this.usersService.updateUser(req.user, data);
  }

  //Follow
  @UseGuards(JwtAuthGuard)
  @Post("/follow/:id")
  followUser(@Req() req:any, @Param("id") idFollow: string){
    return this.usersService.followUser(req.user, idFollow);
  }

  //UnFollow
  @UseGuards(JwtAuthGuard)
  @Post("/unFollow/:id")
  unFollowUser(@Req() req:any, @Param("id") idUnFollow: string){
    return this.usersService.unFollowUser(req.user, idUnFollow);
  }

  //GetFollower
  @UseGuards(JwtAuthGuard)
  @Get("/followers")
  getFollowers(@Req() req: any){
    return this.usersService.getFollowers(req.user)
  }

  //GetFollowings
  @UseGuards(JwtAuthGuard)
  @Get("/followings")
  getFollowings(@Req() req: any){
    return this.usersService.getFollowings(req.user)
  }
}
