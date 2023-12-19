import { Token } from '@prisma/client';

export interface Tokens {
    accessToken: string,
    refreshToken: Token
}

export interface JwtPayload {
    id: string;
    nickName: string;
}

export type googleInfo = {
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    locale: string;
}