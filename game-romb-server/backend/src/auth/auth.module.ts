import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { options } from './config';
import { UserModule } from 'src/user/user.module';
import { STRATIGIES } from './strategies';
import { GUARDS } from './guards';
import { HttpModule } from '@nestjs/axios/dist';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AuthService, ...STRATIGIES, ...GUARDS],
  controllers: [AuthController],
  imports: [
    PassportModule,
    UserModule,
    PrismaModule,
    HttpModule,
    JwtModule.registerAsync(options()),
  ],
})
export class AuthModule {}
