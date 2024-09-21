import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { Breed } from 'src/breeds/entities/breed.entity';
import { UserActiveInterface } from 'src/common/interfaces/user-Active-interface';
import { ROLES } from 'src/common/enums/rol.enum';

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
  //validacion de pertenencias de gatos
  private validarPertenencias(cat:Cat,user:UserActiveInterface){
    if(user.role!==ROLES.ADMIN && cat.userEmail!==user.email){
      throw new UnauthorizedException('Parece que intentas acceder a un cat que no es el que te corresponde')
    }
  }
  private async validatebreeds(breed:string){
    const breedEntity= await this.breedRepository.findOneBy({name: breed});
    if(!breedEntity){
        throw new BadRequestException('No existe esa raza')
    }
    return breedEntity;
  }
/* ------------------------------------------------------------------------------------------ */

   async create(createCatDto: CreateCatDto, user:UserActiveInterface) {
      //vamos hacer una busqueda en base de dato haber si esta el nombre de la raza que nos paso el usuario.
    const breed= await this.validatebreeds(createCatDto.breed)
  
    return await this.catRepository.save({
      ...createCatDto,
      breed:breed,
      userEmail:user.email,
    })
   
  }
  async findAll(user:UserActiveInterface) {
    if(user.role===ROLES.ADMIN){
      return await this.catRepository.find()
    }
    return await this.catRepository.find({
      where:{userEmail:user.email},//va a buscar todos los gatos cuando el email de la base datos coincida con el email del usuario
    });
  }


  async findOne(id: number,user:UserActiveInterface) { 
    const cat= await this.catRepository.findOneBy({id});//lo primero es buscar el gato
    if(!cat){
      throw new BadRequestException('El gato no existe')
    }
    //validacion para correspondencia de cats
    this.validarPertenencias(cat,user);
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto, user:UserActiveInterface) {
    await this.findOne(id,user)
   
    return await this.catRepository.update(id,{
      ...updateCatDto,
      breed:updateCatDto.breed ? await this.validatebreeds(updateCatDto.breed):undefined,
      userEmail:user.email,
    })
  }

  async remove(id: number,user:UserActiveInterface) {
    await this.findOne(id,user)
    return await this.catRepository.softDelete({id});
  }
}
