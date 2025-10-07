import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UpdateAuthDto } from '../auth/dto/update-auth.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly uploadService: UploadService,
  ) {}

  async findOne(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException('Email không hợp lệ!');
    }
    return user;
  }

  async findById(id: string) {
    console.log(id)
    // const user = await this.userModel.findOne({ _id: id }).select('-password');
    // if (!user) {
    //   throw new NotFoundException('Không tìm thấy user hợp lệ!');
    // }
    // return user;
  }

  async updateUser(user: any, data: UpdateAuthDto) {
    try {
      const id: string = user._id;
      if (data.avatar) {
        const url = await this.uploadService.uploadFile(data.avatar);
        data.avatar = url;
      }
      const update = await this.userModel.updateOne({ _id: id }, data);
      return update;
    } catch (error) {
      console.log(error);
    }
  }

  //Follow
  async followUser(user: any, idFollow: string) {
    try {
      const userId = user._id;

      //Thêm id vào followers - following của 2 user
      const update = await Promise.all([
        this.userModel.updateOne(
          { _id: userId },
          { $addToSet: { followings: idFollow } },
        ),
        this.userModel.updateOne(
          { _id: idFollow },
          { $addToSet: { followers: userId } },
        ),
      ]);
      return update;
    } catch (error) {
      console.log(error);
    }
  }

  //Follow
  async unFollowUser(user: any, idFollow: string) {
    try {
      const userId = user._id;

      //remove id vào followers - following của 2 user
      const update = await Promise.all([
        this.userModel.updateOne(
          { _id: userId },
          { $pull: { followings: idFollow } },
        ),
        this.userModel.updateOne(
          { _id: idFollow },
          { $pull: { followers: userId } },
        ),
      ]);
      return update;
    } catch (error) {
      console.log(error);
    }
  }

  //Get Follow
  async getFollowers(user: any) {
    try {
      const followers = await this.userModel.find({_id: {$in: user.followers}}).select("-password")
      return followers;
    } catch (error) {
      console.log(error);
    }
  }

    //Get Follow
  async getFollowings(user: any) {
    try {
      const followers = await this.userModel.find({_id: {$in: user.followings}}).select("-password")
      return followers;
    } catch (error) {
      console.log(error);
    }
  }
}
