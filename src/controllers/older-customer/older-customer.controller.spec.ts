import { Test, TestingModule } from '@nestjs/testing';
import { OlderCustomerController } from './older-customer.controller';

describe('OlderCustomerController', () => {
  let controller: OlderCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OlderCustomerController],
    }).compile();

    controller = module.get<OlderCustomerController>(OlderCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
