import { Module } from '@nestjs/common';
import { MinorCustomerService } from './minor-customer.service';
import { MinorCustomerController } from './minor-customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesMenores } from 'src/entities/minor_customer.entity';
import { Users } from 'src/entities/users.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientesMenores, Users])],
  providers: [MinorCustomerService, UserService],
  controllers: [MinorCustomerController]
})
export class MinorCustomerModule {}
