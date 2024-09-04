import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';


@Module({
  imports: [
    CatsModule,
    BreedsModule,
    TypeOrmModule.forRoot({// este es el modulo para la importacion. 
      type:'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password:'root',
      database: 'db_crud',
      autoLoadEntities:true,// esto nos permite evitar tener que pasar cada entidad  al array de abajo.
     // entities:[],//la entidad nos dice que cada entidad tenemos que pasarcela a este array para que el orm cree las tablas en la base de dato
      synchronize:true,// quiere decir que cada vez que hagamos un cambio se va a tratar de sincronizar la base de datos.     
    }), 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
