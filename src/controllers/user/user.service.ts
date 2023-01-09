import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>, 
  ){}

  public findOneByEmail = (email:string) => {
    return this.usersRepository.findOne({where: {email, is_active: true}});
  }

  public find = (query:string = '') => {
    return this.usersRepository.find({
      where: [
        {is_active: true, nombre: ILike(`%${query}%`)},
        {is_active: true, email: ILike(`%${query}%`)},
      ]
    });
  }

  public findById = (id) => {
    return this.usersRepository.find({where: {is_active: true, id}});
  }

  public save = (admin: Users) => {
    return this.usersRepository.save(admin);
  }

  public update = (id:number, data:{password:string}) => {
    return this.usersRepository.update(id, data);
  }

  public delete = (id:number) => {
    return this.usersRepository.update(id, {is_active: false});
  }
  
  public getUserExecutive = (text:string = '') => {
    return this.usersRepository.find({where: 
      [
        {
          permisos: ILike('%userMobileEfecutivo%'), 
          is_active: true,
          nombre: ILike(`%${text}%`)
        },
        {
          permisos: ILike('%userMobileEfecutivo%'), 
          is_active: true,
          email: ILike(`%${text}%`)
        },
      ]
    });
  }
}
