import { Test, TestingModule } from '@nestjs/testing';
import { RememberingOrderService } from './remembering-order.service';

describe('RememberingOrderService', () => {
  let service: RememberingOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RememberingOrderService],
    }).compile();

    service = module.get<RememberingOrderService>(RememberingOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
