import { applyDecorators, UseGuards } from "@nestjs/common";
import { ROLES } from "src/auth/enums/rol.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";

//Agrupando o concatenando decoradores.
export function Auth(role:ROLES){
    //este metodo aplyDecorators lo que hace es juntar mas de un decorador.
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, RolesGuard),

    )
}