import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";


export class RegisterDto{
    @Transform(({value})=>value.trim())//limpiar los caracteres en blanco.
    @IsString()
    @MinLength(1)
    name:string;

    @IsEmail()
    email:string;

    @Transform(({value})=>value.trim())//limpiar los caracteres en blanco.
    @MinLength(6)
    password:string;
}