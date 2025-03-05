import { Body, Controller, Get, Inject, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { ModuleRef } from '@nestjs/core';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
    constructor(
        // private readonly userService: UserService // c1: dùng nhiều
        // private readonly moduleRef: ModuleRef // c2
        @Inject('USER_SERVICE') private readonly userService: UserService
    ) {
        const userRepository = new UserRepository()
    }

    // @UsePipes(new ValidationPipe())
    @Post()
    createUser(@Body() user: UserDto): UserDto {
        return this.userService.createUser(user) // c1: dùng nhiều
        // return this.moduleRef.get('USER_SERVICE').createUser(user) // c2
    }

    @Get(':id')
    getUserById(@Param('id') id: number) {
        console.log(id);

        return 'test'
    }
}
