import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDto {
  @IsNotEmpty()
  @IsString()
  readonly nickname: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
