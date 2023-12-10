import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
    id: string;
    createdAt: Date;

    @Exclude()
    password: string;
    nickName: string;
    numberGame: number;
    numberWin: number;

    constructor(user: User) {
        Object.assign(this, user);
    }

}