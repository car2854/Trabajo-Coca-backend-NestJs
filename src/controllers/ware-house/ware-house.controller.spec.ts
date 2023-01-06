import { Test, TestingModule } from '@nestjs/testing';
import { WareHouseController } from './ware-house.controller';

describe('WareHouseController', () => {
  let controller: WareHouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WareHouseController],
    }).compile();

    controller = module.get<WareHouseController>(WareHouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
