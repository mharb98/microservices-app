import { Test, TestingModule } from '@nestjs/testing';
import { ContactInfosController } from './contact-infos.controller';

describe('ContactInfosController', () => {
  let controller: ContactInfosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactInfosController],
    }).compile();

    controller = module.get<ContactInfosController>(ContactInfosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
