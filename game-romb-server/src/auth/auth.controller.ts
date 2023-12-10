import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { Tokens } from 'src/types/auth';
import { Response, Request } from 'express';
import { Cookie, UserAgent } from 'src/decorators';

const REFRESH_TOKEN = 'refreshToken';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(@Body() dto: LoginDto, @Res() res: Response, @UserAgent() agent: string) {

        const tokens = await this.authService.login(dto, agent);
        if (!tokens) {
            throw new BadRequestException('Ошибка при авторизации')
        };
        this.setRefreshTokenToCookies(tokens, res);
    }

    @Post('/registration')
    async registration(@Body() dto: RegisterDto, @Res() res: Response, @UserAgent() agent: string) {
        const tokens = await this.authService.register(dto, agent);
        if (!tokens) {
            throw new BadRequestException('Ошибка регистрации')
        };
        this.setRefreshTokenToCookies(tokens, res);
    }

    @Get('/refresh-tokens')
    async refreshTokens(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response, @UserAgent() agent: string) {
        if (!refreshToken) {
            throw new UnauthorizedException();
        };
        const tokens = await this.authService.refresTokens(refreshToken, agent);
        if (!tokens) {
            throw new UnauthorizedException();
        };
        this.setRefreshTokenToCookies(tokens, res);
    }

    @Get('/logout')
    async logout(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
        if (!refreshToken) {
            res.sendStatus(HttpStatus.OK);
            return;
        }
        await this.authService.deleteRefreshToken(refreshToken);
        res.cookie(REFRESH_TOKEN, '', { httpOnly: true, secure: true, expires: new Date() });
        res.sendStatus(HttpStatus.OK);
    }

    @Get('google')
    googleAuth() { }

    @Get('google/callback')
    googleAuthCallback(@Req() req: Request) {
        return req.user;
    }


    private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
        if (!tokens) {
            throw new UnauthorizedException();
        };
        res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
            httpOnly: true,
            sameSite: 'none',
            expires: new Date(tokens.refreshToken.exp),
            secure: false,
            path: '/'
        });
        res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
    }
}
