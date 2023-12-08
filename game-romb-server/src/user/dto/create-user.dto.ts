import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    readonly nickname: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
