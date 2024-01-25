import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.services';
import { UserModule } from 'src/user/user.module';
import { RoomsController } from './rooms.controller';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
  imports: [UserModule],
})
export class RoomsModule {}
