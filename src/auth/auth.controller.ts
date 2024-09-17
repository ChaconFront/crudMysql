import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/loging.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { ROLES } from './enums/rol.enum';
import { Auth } from 'src/decorators/auth.decorator';
 
interface RequestWhithUser extends Request{
user:{
    email:string;
    role:string;
}
}


@Controller('auth')
export class AuthController {
    //importamos el servicio para que sea este quien manipule la base de datos
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    async register(
        @Body()
        registerDto:RegisterDto
    ){
        return await this.authService.register(registerDto);
    }

    @Post('login')
    async login(
        @Body()
        loginDto:LoginDto
    ){
        return  await this.authService.login(loginDto);
    }

   /*  //autorizar que el usuario pueda accerder a siertas rutas.
    @Get('profile')
    @Roles(ROLES.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    //aquile estamos diciendo que ademas viene la info del usuario email y role
   async profile(@Req()req:RequestWhithUser){
        return this.authService.profile(req.user);
    } */

     //autorizar que el usuario pueda accerder a siertas rutas.
     @Get('profile')
     @Auth(ROLES.ADMIN)
    async profile(@Req()req:RequestWhithUser){
         return this.authService.profile(req.user);
     }




}
