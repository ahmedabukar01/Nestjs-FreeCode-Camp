import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDtos } from './dtos/auth-dtos';

@Controller('api')
export class AuthController {
    constructor(private service: AuthService){}

    @Post('signin')
    sigIn(@Body() dtos: SignInDtos){
        return this.service.sigIn(dtos)
    }
    @Post('signup')
    signUp(@Body() dtos: SignInDtos){
        return this.service.signUp(dtos)
    }
}
