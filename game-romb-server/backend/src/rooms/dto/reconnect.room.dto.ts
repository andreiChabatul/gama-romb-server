import { IsNotEmpty, IsUUID } from "class-validator";

export class ReconnectRoomDto {
    @IsNotEmpty()
    @IsUUID()
    readonly idUser: string;
}