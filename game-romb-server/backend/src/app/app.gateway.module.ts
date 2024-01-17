import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { RoomsModule } from 'src/rooms/rooms.module';
import { AppGateWayController } from './app.gateway.controller';

@Module({
    providers: [AppGateway, AppGateWayController],
    exports: [],
    imports: [RoomsModule]
})
export class AppGatewayModule { }
