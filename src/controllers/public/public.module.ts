import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesMenores } from 'src/entities/minor_customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientesMenores])],
  providers: [PublicService],
  controllers: [PublicController]
})
export class PublicModule {}
