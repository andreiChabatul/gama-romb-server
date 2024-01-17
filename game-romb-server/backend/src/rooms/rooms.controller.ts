import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RoomsService } from './rooms.services';
import { CreateRoomDto } from './dto/create.room.dto';
import { ReconnectRoomDto } from './dto/reconnect.room.dto';
import { infoRoom } from 'src/types';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomsController {

    constructor(private readonly roomsService: RoomsService) { }

    @Get()
    async getAllRooms() {
        return (await this.roomsService.getAllRooms());
    }

    @Post('/reconnect')
    async reconnectPlayer(@Body() reconnectRoomDto: ReconnectRoomDto): Promise<infoRoom | undefined> {
        return await this.roomsService.reconnectPlayerId(reconnectRoomDto.idUser);
    }

    @Post()
    createRoom(@Body() createRoomDto: CreateRoomDto) {
        return this.roomsService.createRoom(createRoomDto);
    }

}
