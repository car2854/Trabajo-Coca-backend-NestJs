import { Test, TestingModule } from '@nestjs/testing';
import { RememberingOrderController } from './remembering-order.controller';

describe('RememberingOrderController', () => {
  let controller: RememberingOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RememberingOrderController],
    }).compile();

    controller = module.get<RememberingOrderController>(RememberingOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
