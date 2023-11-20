import { Test, TestingModule } from '@nestjs/testing';
import { HhApi } from './hh.api';

describe('HhApi', () => {
  let provider: HhApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HhApi],
    }).compile();

    provider = module.get<HhApi>(HhApi);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
