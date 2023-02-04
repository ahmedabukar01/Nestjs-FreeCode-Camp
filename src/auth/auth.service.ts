import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDtos } from './dtos/auth-dtos';
import * as argon2 from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private Jwt: JwtService,
        private config: ConfigService
        ){}

    async signUp(dtos: SignInDtos){
       try {
        const password = await argon2.hash(dtos.password)
        const user = await this.prisma.user.create({
            data: {
                ...dtos,
                password,
            }
        })

        return this.signToken(user.id, user.email)
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

        return this.signToken(user.id, user.email)
        // return user;
    }

    async signToken(id: number, email: string): Promise<{accessToken:string}>{
        const payload = {
            sub: id,
            email,
        }

        const token = await this.Jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET')
        })

        return {
            accessToken: token
        }

    }
}
