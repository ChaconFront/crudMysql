import { createParamDecorator, ExecutionContext } from "@nestjs/common";

//ejemplo de otro decorador.
export const ActiveUser=createParamDecorator(
    (data:unknown,ctx:ExecutionContext)=>{//con el execution context podemos acceder al request
        const request= ctx.switchToHttp().getRequest();
        return request.user
    }
)