import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid'
import { LoginDto, RegisterDto } from './dto';
import { UserService } from 'src/user/user.service';
import { Tokens } from 'src/types/auth';
import { Token, User } from '@prisma/client';
import { compareSync } from 'bcryptjs';
import { add } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService, private prismaService: PrismaService) { }

    async register(dto: RegisterDto, agent: string): Promise<Tokens> {
        const candidate = await this.userService.findOne(dto.nickName);
        if (candidate) {
            throw new ConflictException('Пользователь существует');
        };
        const user = await this.userService.save(dto);
        return this.generateTokens(user, agent);
    }

    async login(dto: LoginDto, agent: string): Promise<Tokens> {
        const user = await this.userService.findOne(dto.nickName);
        if (!user && !compareSync(dto.password, user.password)) {
            throw new UnauthorizedException('error login or password');
        };
        return this.generateTokens(user, agent);
    }

    async refresTokens(refreshToken: string, agent: string): Promise<Tokens> {
        const token = await this.prismaService.token.findUnique({ where: { token: refreshToken } });
        if (!token) {
            throw new UnauthorizedException();
        };
        await this.prismaService.token.delete({ where: { token: refreshToken } });
        if (new Date(token.exp) < new Date()) {
            throw new UnauthorizedException();
        }
        const user = await this.userService.findOne(token.userId);
        return this.generateTokens(user, agent);
    }


    private async generateTokens(user: User, agent: string): Promise<Tokens> {
        const accessToken = 'Bearer ' + this.jwtService.sign({
            id: user.id,
            nickName: user.nickName
        });
        const refreshToken = await this.generateRefreshToken(user.id, agent);
        return { accessToken, refreshToken };
    }

    private async generateRefreshToken(userId: string, userAgent: string): Promise<Token> {
        const _token = await this.prismaService.token.findFirst({
            where: {
                userId,
                userAgent
            }
        });
        const token = _token ? _token.token : '';
        return this.prismaService.token.upsert({
            where: { token },
            update: {
                token: uuidv4(),
                exp: add(new Date(), { months: 1 }),
            },
            create: {
                token: uuidv4(),
                exp: add(new Date(), { months: 1 }),
                userAgent,
                userId
            }
        })
    }






    // async login(userDto: CreateUserDto) {
    //     // const user = await this.validateUser(userDto);
    //     // return { accessToken: this.generateToken(user), nickname: user.nickname, idUser: user.userId };
    // }

    // async registration(userDto: CreateUserDto) {
    //     const candidate = await this.prismaService.user.findUnique({ where: { nickName: userDto.nickname } });
    //     if (candidate) {
    //         throw new HttpException('Пользователь существует', HttpStatus.BAD_REQUEST);
    //     };
    //     const hashPassword = await bcrypt.hash(userDto.password, 5);
    //     const user = await this.prismaService.user.create({ data: { nickName: userDto.nickname, password: hashPassword, image: '' } }); 
    //     return { accessToken: this.generateToken(user.nickName, user.id), nickname: user.nickName, idUser: user.id };
    // }

    // private generateToken(username: string, userId: string) {
    //     const payload = { username, userId };
    //     return {
    //         token: this.jwtService.sign(payload)
    //     }
    // }

    // private async validateUser(userDto: CreateUserDto) {
    //     // const user = await this.userService.findOne(userDto.nickname);
    //     // const passwordEguals = await bcrypt.compare(userDto.password, user.password);
    //     // if (user && passwordEguals) {
    //     //     return user;
    //     // };
    //     // throw new UnauthorizedException({ message: 'Неправильный пароль или емайл' });
    // }
}
