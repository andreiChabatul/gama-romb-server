import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid'

export type User = {
    userId: string,
    nickname: string,
    password: string,
    statUser: statUser;
};

export type statUser = {
    totalGame: number;
    winGame: number;
}



export const users: User[] = [
   
];


@Injectable()
export class UsersService {



    async findOne(username: string): Promise<User | undefined> {
        return users.find(user => user.nickname === username);
    }


    async createUser(userCreate: CreateUserDto): Promise<User> {
        const user: User = { ...userCreate, userId: uuidv4(), statUser: { totalGame: 15, winGame: 3 } }
        users.push(user);
        return user;
    }

}
