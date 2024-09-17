import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEYS } from 'src/decorators/roles.decorator';
import { ROLES } from '../enums/rol.enum';

//este guard nos va a permitir comprobar el rol que le estoy pasando en el token y el rol que le estoy
//pasando en el decorador.
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector:Reflector){}
  //el reflector es el que nos va a permitir leer el rool.
  canActivate(
    context: ExecutionContext,
  ): boolean{
    const role=this.reflector.getAllAndOverride<ROLES>(ROLE_KEYS,[
      context.getHandler(),
      context.getClass(),
    ])

    //si rol no esta definido retorna true.
    if(!role){
      return true;
    }
    
    //Como podemos acceder al usuario, a traves del request.
    const {user}=context.switchToHttp().getRequest();
    return role=== user.role;
  }
}
