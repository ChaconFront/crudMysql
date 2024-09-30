import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-Active-interface';

@Injectable()
export class UsersService {

constructor(
  @InjectRepository(User)// a traves de este patron podemos manipular la base de datos.
  private readonly userRepository: Repository<User>
){}

//metodo create y findOneByEmail
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  //buscando un email en especifico en base datos
  async findOneByEmail(email:string){
    return await this.userRepository.findOneBy({email})
  }

  async FindByEmailWhitPassword(email:string){
    /* a diferencia del finOneBy el findOne nos permte hacer una busqueda un poco mas robusta. */
    return await this.userRepository.findOne({
      where:{email},
      select:['id','name','email','password','role'],
    })
  }

  //retorna todos los usuarios que existen en base datos
  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }


  async EliminarUser(id: number) {
    const id_user= await this.userRepository.findOneBy({id})
      if(!id_user){
        throw new BadRequestException('El usuario no esiste en base datos')
      }
    return await this.userRepository.softDelete(id)
  }
}
