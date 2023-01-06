import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository (Users)
    private usersRepository: Repository<Users>
  ){}

  public findOneByEmail = (email:string) => {
    return this.usersRepository.findOne({where: {email, is_active: true}});
  }

  public findOneById = (id:number) => {
    return this.usersRepository.findOne({where: {id, is_active: true}})
  }
}
