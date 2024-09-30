import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import *  as bcryptjs from  "bcryptjs" //para el hasheo de contraseñas bcryptjs
import { LoginDto } from './dto/loging.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

     constructor(
      private readonly userService:UsersService,
      private readonly jwtService: JwtService,//utilizamos el servicio de jwt.

     ){}

  async  register({name,email,password}: RegisterDto){
     //verificamos si ese usuario existe en base de datos
     const user= await this.userService.findOneByEmail(email);
     if (user) {
          throw new BadRequestException('user already exist')
     }
   await this.userService.create({name,email,password: await bcryptjs.hash(password,10)});
    return {
      name,
      email
    }
}

  async login({email,password}:LoginDto){
     //verificamos el email.
     const user= await this.userService.FindByEmailWhitPassword(email);
     if(!user){
     throw new UnauthorizedException('email is wrong')
     }
     //verificamos la contraseña.
     const isPasswordValid= await bcryptjs.compare(password,user.password)
     if(!isPasswordValid){
      throw new UnauthorizedException('password is wrong')
     }
     //este payload es el que vamos a inyectarle al token para que tenga datos adicionales, y despues
     //solicitar el perfil del usuario
     const payload ={ email: user.email, role: user.role}
     //Este metodo nos permite firmar el token.
     const token= await this.jwtService.signAsync(payload)
        return {
         token,
         email
        };
}

 async profile({email,role}:{email:string, role:string}){
   return await this.userService.findOneByEmail(email);
}

}