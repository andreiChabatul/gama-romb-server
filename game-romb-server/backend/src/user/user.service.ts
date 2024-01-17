import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { defaultAvatar } from './dto/default.avatar';
import { compareSync, hashSync } from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

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

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const userRepeat = await this.findOne(updateUserDto.newNickName);
        const user = await this.findOne(id);
        if (userRepeat && userRepeat.id !== user.id) {
            throw new BadRequestException('Ошибка обновления. Пользователь с новым никнеймом существует.');
        };
        const userUpdate = await this.prismaServices.user.update({
            where: {
                id
            },
            data: {
                nickName: user.nickName === updateUserDto.newNickName ? undefined : updateUserDto.newNickName,
                image: user.image === updateUserDto.newAvatar ? undefined : updateUserDto.newAvatar,
                password: updateUserDto.newPassword === '*******' ? undefined : this.hashPassword(updateUserDto.newPassword)
            }
        });
        if (user && compareSync(updateUserDto.password, user.password)) {
            return userUpdate;
        };
        throw new BadRequestException('Пользователя не существует или пароль неверный');
    }

    async deleteUser(deleteUserDto: DeleteUserDto): Promise<string> {
        const user = await this.findOne(deleteUserDto.nickname);
        if (user && user.nickName === deleteUserDto.nickname && compareSync(deleteUserDto.password, user.password)) {
            await this.prismaServices.user.delete(
                { where: { nickName: deleteUserDto.nickname } }
            );
            return deleteUserDto.nickname;
        }
        throw new BadRequestException('Введен неверный пароль или никнейм');
    }

    private hashPassword(password: string): string {
        return hashSync(password, 5);
    }

}
