import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  //para activar el patron repositorio tenemos que colocarlo dentro del constructor de nuestro CatService.
  constructor(
    @InjectRepository(Cat)//inyectamos el repositorio de cat
    //en esta clase vamos a poder acceder a todos los metodos que tiene nuestro repositorio catRepository.
    private readonly catRepository: Repository<Cat>,//aqui inicializamos el repositorio
  ) {
    
  }
   async create(createCatDto: CreateCatDto) {
     /* try {
       const cat=this.catRepository.create(createCatDto)//creando un nuevo cat, al hacer esto estamos validando tambien
       return await this.catRepository.save(cat);//guardamos el objeto en base de datos
    } catch (error) {
      console.log(error);
    } */
  }

  async findAll() {
    return await this.catRepository.find();//Va a buscar los datos
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    //return await this.catRepository.update(id,updateCatDto);
  }

  async remove(id: number) {
    return await this.catRepository.softDelete({id});
   // return await this.catRepository.softRemove({id});
  }
}
