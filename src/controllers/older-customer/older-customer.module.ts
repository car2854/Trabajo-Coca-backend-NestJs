import { Module } from '@nestjs/common';
import { OlderCustomerService } from './older-customer.service';
import { OlderCustomerController } from './older-customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesMayores } from 'src/entities/older_customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientesMayores])],
  providers: [OlderCustomerService],
  controllers: [OlderCustomerController]
})
export class OlderCustomerModule {}
