import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService
    ) { }

    login(userDto: CreateUserDto) { }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.findOne(userDto.username);
        if (candidate) {
            throw new HttpException('Пользователь существует', HttpStatus.BAD_REQUEST);
        };
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({ ...userDto, password: hashPassword });
        return this.generateToken(user);
    }


    private generateToken(user: User) {
        const payload = { username: user.username, userId: user.userId };
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
