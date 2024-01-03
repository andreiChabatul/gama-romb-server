import { ClassSerializerInterceptor, Controller, Get, Param, UseGuards, UseInterceptors, Patch, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserResponse } from './responces';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        const user = await this.userService.findOne(id);
        return new UserResponse(user);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userService.updateUser(id, updateUserDto);
        return new UserResponse(user);
    }

}
