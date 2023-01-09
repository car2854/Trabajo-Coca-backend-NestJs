import { Test, TestingModule } from '@nestjs/testing';
import { MinorCustomerController } from './minor-customer.controller';

describe('MinorCustomerController', () => {
  let controller: MinorCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinorCustomerController],
    }).compile();

    controller = module.get<MinorCustomerController>(MinorCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
