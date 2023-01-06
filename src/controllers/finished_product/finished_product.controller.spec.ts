import { Test, TestingModule } from '@nestjs/testing';
import { FinishedProductController } from './finished_product.controller';

describe('FinishedProductController', () => {
  let controller: FinishedProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinishedProductController],
    }).compile();

    controller = module.get<FinishedProductController>(FinishedProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
