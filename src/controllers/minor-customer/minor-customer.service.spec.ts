import { Test, TestingModule } from '@nestjs/testing';
import { MinorCustomerService } from './minor-customer.service';

describe('MinorCustomerService', () => {
  let service: MinorCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinorCustomerService],
    }).compile();

    service = module.get<MinorCustomerService>(MinorCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
