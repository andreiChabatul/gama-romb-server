import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return { accessToken: this.generateToken(user), nickname: user.nickname, idUser: user.userId };
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.findOne(userDto.nickname);
        if (candidate) {
            throw new HttpException('Пользователь существует', HttpStatus.BAD_REQUEST);
        };
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({ ...userDto, password: hashPassword });
        return { accessToken: this.generateToken(user), nickname: user.nickname, idUser: user.userId, statUser: user.statUser };
    }

    private generateToken(user: User) {
        const payload = { username: user.nickname, userId: user.userId };
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.findOne(userDto.nickname);
        const passwordEguals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEguals) {
            return user;
        };
        throw new UnauthorizedException({ message: 'Неправильный пароль или емайл' });
    }
}
