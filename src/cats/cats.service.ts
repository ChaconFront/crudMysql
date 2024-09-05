import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  //para activar el patron repositorio tenemos que colocarlo dentro del constructor de nuestro CatService.
  constructor(
    @InjectRepository(Cat)//inyectamos el repositorio de cat
    //en esta clase vamos a poder acceder a todos los metodos que tiene nuestro repositorio catRepository.
    private readonly catRepository: Repository<Cat>,//aqui inicializamos el repositorio

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,//tenemos que inyectar la otra entidad para poder obtener, crear,actualizar.
 
  ) {}

   async create(createCatDto: CreateCatDto) {
      //vamos hacer una busqued en base de dato haber si esta el nombre de la raza que nos paso el usuario.
   const breed= await this.breedRepository.findOneBy({name: createCatDto.breed});
   if(!breed){
       throw new BadRequestException('No existe esa raza')
   }
   else{
    return await this.catRepository.save({
      ...createCatDto,
      breed,
    })

   }
  }

  async findAll() {
    return await this.catRepository.find();//Va a buscar los datos
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    //return await this.catRepository.update(id,updateCatDto)
    return;
  }

  async remove(id: number) {
    return await this.catRepository.softDelete({id});
   // return await this.catRepository.softRemove({id});
  }
}
