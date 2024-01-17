import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {

    @IsString()
    readonly newNickName: string;

    @IsString()
    readonly newPassword: string;


    @IsString()
    readonly newAvatar: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
