import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorias } from 'src/entities/category.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Categorias)
    private categoryRepository: Repository<Categorias>
  ){}

  public find = (query:string = '') => {
    return this.categoryRepository.find({
      where:[
        {is_active: true, nombre: ILike(`%${query}%`)},
        {is_active: true, sabor: ILike(`%${query}%`)},
      ]
    });
  }
  
  public findById = (id:number) => {
    return this.categoryRepository.findOne({where:{id, is_active: true}});
  }

  public save = (category: Categorias) => {
    return this.categoryRepository.save(category);
  }

  public update = (id:number, data:any) => {
    return this.categoryRepository.update(id, data);
  }

  public delete = (id:number) => {
    return this.categoryRepository.update(id, {is_active: false});
  }
}
