import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsCharityTypesController } from './organizations-charity-types.controller';

describe('OrganizationsCharityTypesController', () => {
  let controller: OrganizationsCharityTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsCharityTypesController],
    }).compile();

    controller = module.get<OrganizationsCharityTypesController>(
      OrganizationsCharityTypesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
