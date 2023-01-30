import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDtos } from './dtos/auth-dtos';
import * as argon2 from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    async signUp(dtos: SignInDtos){
       try {
        const password = await argon2.hash(dtos.password)
        const user = await this.prisma.user.create({
            data: {
                ...dtos,
                password,
            }
        })

        delete user.password
        return user;
       } catch (error) {
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2002'){
                throw new ForbiddenException('Credentials taken')
            }
        }

        throw error
       }
    }

    async sigIn(dtos: SignInDtos){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dtos.email
            }
        })

        if(!user) throw new ForbiddenException('Credentials incorrect!');

        const pwMatchs = await argon2.verify(user.password, dtos.password)

        if(!pwMatchs) throw new ForbiddenException('Credentials incorrect!');

        delete user.password;
        return user
    }
}
