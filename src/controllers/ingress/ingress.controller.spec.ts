import { Test, TestingModule } from '@nestjs/testing';
import { IngressController } from './ingress.controller';

describe('IngressController', () => {
  let controller: IngressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngressController],
    }).compile();

    controller = module.get<IngressController>(IngressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
