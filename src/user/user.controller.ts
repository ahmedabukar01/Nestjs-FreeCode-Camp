import { Controller, Get, Injectable, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/Guards/jwt.guard';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){

    }
  
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req: Request){
        console.log(req.user)
        return this.userService.getMe()
    }
}
