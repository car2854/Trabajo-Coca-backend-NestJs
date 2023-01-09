import { Module } from '@nestjs/common';
import { MinorCustomerService } from './minor-customer.service';
import { MinorCustomerController } from './minor-customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesMenores } from 'src/entities/minor_customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientesMenores])],
  providers: [MinorCustomerService],
  controllers: [MinorCustomerController]
})
export class MinorCustomerModule {}
