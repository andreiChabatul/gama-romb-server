import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppGatewayModule } from './app/app.gateway.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:
    [
      AuthModule,
      AppGatewayModule,
      ConfigModule.forRoot({ isGlobal: true })
    ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule { }
