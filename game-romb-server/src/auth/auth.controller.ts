import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { Tokens, googleInfo } from 'src/types/auth';
import { Response, Request } from 'express';
import { Cookie, UserAgent } from 'src/decorators';
import { GoogleGuard } from './guards/google.guard';
import { HttpService } from '@nestjs/axios';
import { FRONT_ACCESS, GOOGLE_AUTH_INFO } from 'src/const';
import { map, mergeMap } from 'rxjs';
import { handleTimeoutAndErrors } from 'src/lib/common/helper';
import { YandexGuard } from './guards/yandex.guard';

const REFRESH_TOKEN = 'refreshToken';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly httpService: HttpService) { }

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
        res.cookie(REFRESH_TOKEN, '', { httpOnly: true, sameSite: 'none', secure: true, expires: new Date(), path: '/' });
        res.sendStatus(HttpStatus.OK);
    }


    @UseGuards(GoogleGuard)
    @Get('google')
    authGoogle() { }

    @UseGuards(GoogleGuard)
    @Get('google/callback')
    googleAuthCallback(@Req() req: Request, @Res() res: Response, @UserAgent() agent: string) {
        const googleToken = req.user['accessToken']
        if (googleToken) {
            return this.httpService
                .get(`${GOOGLE_AUTH_INFO}${googleToken}`)
                .pipe(
                    mergeMap(({ data: { name } }) => this.authService.googleAuth(name, agent)),
                    handleTimeoutAndErrors(),
                    map((tokens) => {
                        this.setRefreshTokenToCookies(tokens, res, false);
                        res.redirect(`${FRONT_ACCESS}${tokens.accessToken}`)
                    })
                );
        };
    }

    @UseGuards(YandexGuard)
    @Get('yandex')
    yandexAuth() { }

    @UseGuards(YandexGuard)
    @Get('yandex/callback')
    yandexAuthCallback(@Req() req: Request, @Res() res: Response, @UserAgent() agent: string) {
        const googleToken = req.user['accessToken']
        if (googleToken) {
            return this.httpService
                .get(`${GOOGLE_AUTH_INFO}${googleToken}`)
                .pipe(
                    mergeMap(({ data: { name } }) => this.authService.googleAuth(name, agent)),
                    handleTimeoutAndErrors(),
                    map((tokens) => {
                        this.setRefreshTokenToCookies(tokens, res, false);
                        res.redirect(`${FRONT_ACCESS}${tokens.accessToken}`)
                    })
                );
        };
    }

    private setRefreshTokenToCookies(tokens: Tokens, res: Response, isSend: boolean = true): void {
        if (!tokens) {
            throw new UnauthorizedException();
        };
        res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
            httpOnly: true,
            sameSite: 'none',
            expires: new Date(tokens.refreshToken.exp),
            secure: true,
            path: '/'
        });
        isSend ? res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken }) : '';
    }
}
