import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignInDtos {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}
export class SignUpDtos extends SignInDtos  {
    @IsString()
    firstName?: string
    
    @IsString()
    lastName?: string
}