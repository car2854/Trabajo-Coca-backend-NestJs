import { Test, TestingModule } from '@nestjs/testing';
import { OlderCustomerService } from './older-customer.service';

describe('OlderCustomerService', () => {
  let service: OlderCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OlderCustomerService],
    }).compile();

    service = module.get<OlderCustomerService>(OlderCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
