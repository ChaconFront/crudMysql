import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';


//para que los modulos compartan informacion en uno tenemos que importar y en el otro exportar el typeOrmModule.

@Module({
  imports :[TypeOrmModule.forFeature([Breed])],//despues de crear la importacion vamos 
  controllers: [BreedsController],
  providers: [BreedsService],
  exports:[TypeOrmModule] //recuerda que los modulos estan encapsulados si no le indicamos que compartan informacion no lo va hacer por eso exportamos el modulo de breed
})
export class BreedsModule {}
