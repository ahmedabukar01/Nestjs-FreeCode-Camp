import { Controller, Get, Injectable, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/Guards/jwt.guard';
import { User } from 'src/auth/decorator/user.decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService){

    }
  
    @Get('me')
    getMe(@User() user){
        console.log(user)
        return this.userService.getMe()
    }
}
