import { Controller, Get, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){

    }
    @Get()
    hi() {
        return 'hi'
    }
    // @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(){
        return this.userService.getMe()
    }
}
