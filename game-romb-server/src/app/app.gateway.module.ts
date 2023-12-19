import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
    providers: [AppGateway],
    exports: [],
    imports: [RoomsModule]
})
export class AppGatewayModule { }
