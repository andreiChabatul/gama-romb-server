import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid'

export type User = {
    userId: string,
    nickname: string,
    password: string
};


@Injectable()
export class UsersService {

    private readonly users: User[] = [
        {
            userId: '1',
            nickname: 'john',
            password: 'changeme',
        },
        {
            userId: '2',
            nickname: 'maria',
            password: 'guess',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.nickname === username);
    }


    async createUser(userCreate: CreateUserDto): Promise<User> {
        const user = { ...userCreate, userId: uuidv4() }
        this.users.push(user);
        return user
    }

}
