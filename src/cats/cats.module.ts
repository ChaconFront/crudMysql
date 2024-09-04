import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Breed } from 'src/breeds/entities/breed.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Cat, Breed]),  ],//despues de haber creado la entidad la importamos mediante el typeORM
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
