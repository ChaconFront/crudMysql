//esta va hacer cada una de las propiedades del cat o sea la information que se va a guardar en la base 

import { IsString } from "class-validator";
import { Breed } from "src/breeds/entities/breed.entity";
import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
//realmente quien necesita las consultas del breed es el cat.
@Entity()//este es el decorador 
export class Cat {
    // @PrimaryGeneratedColumn()
    @Column({primary:true, generated:true})
    id: number;

    @Column()
    @IsString()
    name:string;

    @Column()
    age: number;

    @DeleteDateColumn()//cada vez que hagamos una eliminacion nos va a poner la fecha en la que se elimino ese elemento
    deleteAd: Date;
    //relacion con la tabla breed
    //recibe dos funciones la primera para la tabla a la que se hace la relacion.
    //la segunda funcion se le pasa el breed y lo relacionamos con un campo que sea unico de la otra tabla
    @ManyToOne(()=>Breed,(breed)=>breed.id,{//el oneToMany si puede vivir sin el OneToMany
        eager:true,//para que traiga las raza al hacer un finOne . 
    })
    breed:Breed;//le pasas la instancia de la entiddad.

    
    @JoinColumn({name:'userEmail',referencedColumnName:'email'})
    user:User;//referencia a la entidad usuario.
    @Column()
    userEmail:string;

}
