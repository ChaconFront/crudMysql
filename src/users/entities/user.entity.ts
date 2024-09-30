
import { ROLES } from "../../common/enums/rol.enum";
import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User {
    @Column({primary: true, generated:true})
    id:number;

    @Column()
    name: string;

    @Column({unique:true, nullable:false})//campo unico
    email:string;
    //nos dice que este campo no puede estar vacio, y el select nos evitara que al hacer una consulta salga el pasword de los usuarios.
    @Column({nullable: false, select:false })
    password: string;

    //los roles son importantes para saber cual es el rol que tiene un usuario al ser creado
    //@Column({type: 'enum', enum: ['admin', 'user'] })
    @Column({type:'enum',default:ROLES.USER, enum:ROLES })
    role: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
