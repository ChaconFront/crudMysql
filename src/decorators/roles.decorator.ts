import { SetMetadata } from "@nestjs/common";
import { ROLES } from "src/auth/enums/rol.enum";

//exportar una constante que nos va a devolver una funcion flecha.
//nos va a permitir agregarle infomacion al request que estamos solicitando.
export const ROLE_KEYS='roles';
export const Roles =(role: ROLES)=>SetMetadata(ROLE_KEYS,role);