import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app/app.gateway';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [AuthModule, UsersModule, GameModule],
  controllers: [],
  providers: [AppGateway],
  exports: [UsersModule]
})
export class AppModule { }
