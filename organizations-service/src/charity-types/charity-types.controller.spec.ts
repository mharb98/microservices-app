import { Test, TestingModule } from '@nestjs/testing';
import { CharityTypesController } from './charity-types.controller';

describe('CharityTypesController', () => {
  let controller: CharityTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharityTypesController],
    }).compile();

    controller = module.get<CharityTypesController>(CharityTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
