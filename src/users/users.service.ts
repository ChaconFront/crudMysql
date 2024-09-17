import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  //retorna todos los usuarios que existen en base datos
  async findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
