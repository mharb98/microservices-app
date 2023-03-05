import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Organization, OrganizationSchema } from './schema/organization.schema';
import { OrganizationsRepository } from './repositories/organizations.repository';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, OrganizationsRepository],
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
})
export class OrganizationsModule {}
