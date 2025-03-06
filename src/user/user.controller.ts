import { Body, Controller, Get, Inject, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { ModuleRef } from '@nestjs/core';
import { UserDto } from './user.dto';
import { LoggerService } from '../logger/logger.service';

@Controller('users')
export class UserController {
    constructor(
        // private readonly userService: UserService // c1: dùng nhiều
        // private readonly moduleRef: ModuleRef // c2
        @Inject('USER_SERVICE') private readonly userService: UserService,
        private readonly logger: LoggerService
    ) {
        const userRepository = new UserRepository()
    }

    // @UsePipes(new ValidationPipe())
    @Post()
    createUser(@Body() user: UserDto): UserDto {
        return this.userService.createUser(user) // c1: dùng nhiều
        // return this.moduleRef.get('USER_SERVICE').createUser(user) // c2
    }

    @Get('test1')
    test1() {
        return this.logger.log()
    }

    @Get('test2')
    test2() {
        return this.logger.log()
    }

    @Get(':id')
    getUserById(@Param('id') id: number) {
        console.log(id);

        return 'test'
    }
}
