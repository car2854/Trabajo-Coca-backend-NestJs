import { Test, TestingModule } from '@nestjs/testing';
import { WareHouseService } from './ware-house.service';

describe('WareHouseService', () => {
  let service: WareHouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WareHouseService],
    }).compile();

    service = module.get<WareHouseService>(WareHouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
