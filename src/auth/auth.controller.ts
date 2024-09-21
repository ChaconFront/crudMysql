import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/loging.dto';
import { Request } from 'express';
import { ROLES } from '../common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-Active-interface';
 
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
    async profile(@ActiveUser()user:UserActiveInterface){//esta request viene del payload que creamos cuando el usuario se logueo en base datos
         return this.authService.profile(user);
     }




}
