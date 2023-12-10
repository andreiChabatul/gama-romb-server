import { ClassSerializerInterceptor, Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserResponse } from './responces';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        const user = await this.userService.findOne(id);
        return new UserResponse(user);
    }

}
