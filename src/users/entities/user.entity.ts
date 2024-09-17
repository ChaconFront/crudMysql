import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User {
    @Column({primary: true, generated:true})
    id:number;

    @Column()
    name: string;

    @Column({unique:true, nullable:false})//campo unico
    email:string;

    @Column({nullable: false})//nos dice que este campo no puede estar vacio
    password: string;

    //los roles son importantes para saber cual es el rol que tiene un usuario al ser creado
    //@Column({type: 'enum', enum: ['admin', 'user'] })
    @Column({default:'user'})
    role: string;


    @DeleteDateColumn()
    deletedAt: Date;


}
