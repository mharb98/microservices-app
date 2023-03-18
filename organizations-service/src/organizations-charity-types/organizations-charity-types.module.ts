import { Module } from '@nestjs/common';
import { CharityTypesModule } from '../charity-types/charity-types.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { OrganizationsCharityTypesController } from './organizations-charity-types.controller';
import { OrganizationsCharityTypesService } from './organizations-charity-types.service';
import { OrganizationsCharityTypesRepository } from './repositories/organizations-charity-types.repository';

@Module({
  controllers: [OrganizationsCharityTypesController],
  providers: [
    OrganizationsCharityTypesService,
    OrganizationsCharityTypesRepository,
  ],
  imports: [OrganizationsModule, CharityTypesModule],
})
export class OrganizationsCharityTypesModule {}
