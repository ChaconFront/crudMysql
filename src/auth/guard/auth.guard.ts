import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt,constant';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService:JwtService
  ){}
//vamos a verificar si el token que le estamos pasando es valido y si es valido lo dejamos pasar a alguna ruta.
 async canActivate(context: ExecutionContext): Promise<boolean> {
    const request= context.switchToHttp().getRequest();//acceder a la request del usuario
    //console.log(request.headers.authorization)
    const token=this.extractTokenFromHeader(request);//extraer el token
    if(!token){
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token,{
        secret: jwtConstants.secret
      });
      //request va a tener una propiedad nueva llamada user y ese user va a tener el pyload
      // En este caso le estamos agregando usuario
      //request['user']=payload;
      request.user=payload;
    } catch{
      throw new UnauthorizedException();
    }
    return true;
  }

  //Metodo para extraer el token de la cabecera.
  private extractTokenFromHeader(request:Request): string|undefined{
    //destructurando el array.
    const [type,token]=request.headers.authorization?.split(' ') ??[];
    return type==='Bearer'? token:undefined;
  }
}
