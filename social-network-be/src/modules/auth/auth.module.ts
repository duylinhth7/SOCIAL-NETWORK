import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from 'src/passport/local.strategy';
import { UploadModule } from '../upload/upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import {
  ForgetPassword,
  ForgetPasswordSchema,
} from 'src/schemas/forgetPassword.schema';
import { JwtStrategy } from 'src/passport/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UploadModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ForgetPassword.name, schema: ForgetPasswordSchema }, //đăng ký model ForgetPassword
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule], // cần import ConfigModule
      inject: [ConfigService], // inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // lấy từ .env
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES') },
      }),
    }),
  ],
})
export class AuthModule {}
