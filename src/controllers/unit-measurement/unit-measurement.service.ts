import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnidadDeMedida } from 'src/entities/unit_of_measuremet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitMeasurementService {

  constructor(
    @InjectRepository(UnidadDeMedida)
    private unitMeasurementRepository: Repository<UnidadDeMedida>
  ){}

  public find = () => {
    return this.unitMeasurementRepository.find({where: {is_active: true}});
  }

  public findById = (id:number) => {
    return this.unitMeasurementRepository.findOne({where: {id, is_active: true}});
  }

  public save = (unitMeasurement: UnidadDeMedida) => {
    return this.unitMeasurementRepository.save(unitMeasurement);
  }

}
