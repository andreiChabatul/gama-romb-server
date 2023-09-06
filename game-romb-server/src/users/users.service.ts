import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid'

export type User = {
    userId: string,
    nickname: string,
    password: string
};


export const users: User[] = [
    {
        userId: '1',
        nickname: 'john',
        password: 'changeme',
    }
];


@Injectable()
export class UsersService {

    

    async findOne(username: string): Promise<User | undefined> {
        return users.find(user => user.nickname === username);
    }


    async createUser(userCreate: CreateUserDto): Promise<User> {
        const user = { ...userCreate, userId: uuidv4() }
        users.push(user);
        return user;
    }

}
