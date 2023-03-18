import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharityTypeEntity } from '../../charity-types/entities/charity-type.entity';
import { CharityType } from '../../charity-types/schema/charity-type.schema';
import { OrganizationEntity } from '../../organizations/entities/organization.entity';
import { Organization } from '../../organizations/schema/organization.schema';

@Injectable()
export class OrganizationsCharityTypesRepository {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationEntity>,
    @InjectModel(CharityType.name)
    private charityTypeModel: Model<CharityTypeEntity>,
  ) {}

  async subscribeToCharityType(
    organizationId: string,
    charityTypeId: string,
  ): Promise<void> {
    await this.checkOrganization(organizationId);
    await this.checkCharityType(charityTypeId);

    await this.organizationModel.findByIdAndUpdate(
      organizationId,
      { $push: { charityTypes: charityTypeId } },
      { new: true, useFindAndModify: false },
    );

    await this.charityTypeModel.findByIdAndUpdate(
      charityTypeId,
      { $push: { organizations: organizationId } },
      { new: true, useFindAndModify: false },
    );
  }

  async unsubscribeFromCharityType(
    organizationId: string,
    charityTypeId: string,
  ): Promise<void> {
    await this.checkOrganization(organizationId);
    await this.checkCharityType(charityTypeId);

    try {
      await this.organizationModel.findByIdAndUpdate(
        organizationId,
        { $pull: { charityTypes: charityTypeId } },
        { new: true, useFindAndModify: false },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not remove charity type from organization',
      );
    }

    try {
      await this.charityTypeModel.findByIdAndUpdate(
        charityTypeId,
        { $pull: { organizations: organizationId } },
        { new: true, useFindAndModify: false },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not remove organization from charity type',
      );
    }
  }

  async getOrganizationCharityTypes(
    organizationId: string,
  ): Promise<CharityTypeEntity[]> {
    return this.charityTypeModel.find({ organizations: organizationId });
  }

  async getCharityTypeOrganizations(
    charityTypeId: string,
  ): Promise<OrganizationEntity[]> {
    return this.organizationModel.find({ charityTypes: charityTypeId });
  }

  private async checkOrganization(organizationId: string) {
    const organizationEntity = await this.organizationModel.findById(
      organizationId,
    );

    if (!organizationEntity) {
      throw new NotFoundException('Organization does not exist');
    }
  }

  private async checkCharityType(charityTypeId: string) {
    const CharityTypeEntity = await this.charityTypeModel.findById(
      charityTypeId,
    );

    if (!CharityTypeEntity) {
      throw new NotFoundException('Charity type does not exist');
    }
  }
}
