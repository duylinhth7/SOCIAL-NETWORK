import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/passport/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],   // cần import ConfigModule
      inject: [ConfigService],   // inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // lấy từ .env
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES') },
      }),
    }),
  ],
})
export class AuthModule {}
