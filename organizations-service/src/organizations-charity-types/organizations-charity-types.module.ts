import { Module } from '@nestjs/common';
import { OrganizationsCharityTypesController } from './organizations-charity-types.controller';
import { OrganizationsCharityTypesService } from './organizations-charity-types.service';

@Module({
  controllers: [OrganizationsCharityTypesController],
  providers: [OrganizationsCharityTypesService],
  imports: [],
})
export class OrganizationsCharityTypesModule {}
