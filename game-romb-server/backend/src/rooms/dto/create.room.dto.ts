import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
    @IsNotEmpty()
    @IsString()
    readonly roomName: string;

    @IsNotEmpty()
    @IsNumber()
    readonly maxPlayers: number;

    @IsNotEmpty()
    @IsNumber()
    readonly timeTurn: number;
}