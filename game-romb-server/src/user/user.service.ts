import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { defaultAvatar } from './dto/default.avatar';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

    constructor(private readonly prismaServices: PrismaService) { }

    async save(user: Partial<User>): Promise<User> {
        const hashPassword = user?.password ? this.hashPassword(user.password) : null;
        return this.prismaServices.user.create({
            data: {
                nickName: user.nickName,
                password: hashPassword,
                image: defaultAvatar
            }
        });
    }

    async findOne(idOrNickname: string): Promise<User> {
        return this.prismaServices.user.findFirst({
            where: {
                OR: [{ id: idOrNickname }, { nickName: idOrNickname }]
            }
        })
    }

    async findMany(idUsers: string[]) {
        const players = await this.prismaServices.user.findMany({
            where: {
                id: { in: idUsers },
            },
        })
        players.forEach((player) => delete player.password);
        return players;
    }

    delete(id: string) {
        return this.prismaServices.user.delete(
            { where: { id } }
        );
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, 5);
    }

}
