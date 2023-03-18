import { Injectable } from '@nestjs/common';
import { CharityTypeEntity } from '../charity-types/entities/charity-type.entity';
import { OrganizationEntity } from '../organizations/entities/organization.entity';
import { CharityTypesListEntity } from './entities/charity-types-list.entity';
import { organizationsListEntity } from './entities/organizations-list.entity';
import { OrganizationsCharityTypesRepository } from './repositories/organizations-charity-types.repository';

@Injectable()
export class OrganizationsCharityTypesService {
  constructor(private repository: OrganizationsCharityTypesRepository) {}

  async subscribeToCharityType(
    organizationId: string,
    charityTypeId: string,
  ): Promise<void> {
    await this.repository.subscribeToCharityType(organizationId, charityTypeId);
  }

  async unSubscribeFromCharityType(
    organizationId: string,
    charityTypeId: string,
  ): Promise<any> {
    await this.repository.unsubscribeFromCharityType(
      organizationId,
      charityTypeId,
    );
  }

  async getOrganizationCharityTypes(
    organizationId: string,
  ): Promise<CharityTypesListEntity> {
    const charityTypes: CharityTypeEntity[] =
      await this.repository.getOrganizationCharityTypes(organizationId);
    return { charityTypes };
  }

  async getCharityTypeOrganizations(
    charityTypeId: string,
  ): Promise<organizationsListEntity> {
    const organizations: OrganizationEntity[] =
      await this.repository.getCharityTypeOrganizations(charityTypeId);
    return { organizations };
  }
}
