import { Test, TestingModule } from '@nestjs/testing';
import { HhController } from './hh.controller';

describe('HhController', () => {
  let controller: HhController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HhController],
    }).compile();

    controller = module.get<HhController>(HhController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
