import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizationEntity } from '../entities/organization.entity';
import { Organization } from '../schema/organization.schema';
import CreateOrganizationInput from '../types/create-organization-inputs.interface';
import QueryOrganizationInput from '../types/query-organizations-input.interface';
import UpdateOrganizationInput from '../types/update-organization-input.interface';

@Injectable()
export class OrganizationsRepository {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationEntity>,
  ) {}

  async create(
    createOrganizationInput: CreateOrganizationInput,
  ): Promise<OrganizationEntity> {
    const organizationEntity = new this.organizationModel(
      createOrganizationInput,
    );
    try {
      return await organizationEntity.save();
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        throw new ConflictException('Organization has already been created');
      }

      throw new InternalServerErrorException(
        'Could not create your organization',
      );
    }
  }

  async findOneAndUpdate(
    organizationId: string,
    updateOrganizationInput: UpdateOrganizationInput,
  ): Promise<OrganizationEntity> {
    const organizationEntity = await this.organizationModel.findById(
      organizationId,
    );

    if (!organizationEntity) {
      throw new NotFoundException('Could not find the specified organization');
    }

    try {
      return await this.organizationModel.findByIdAndUpdate(
        organizationId,
        updateOrganizationInput,
        { new: true },
      );
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Organization already exists with that name',
        );
      }
    }
  }

  async findUnique(organizationId: string): Promise<OrganizationEntity> {
    const organizationEntity = await this.organizationModel.findById(
      organizationId,
    );

    if (!organizationEntity) {
      throw new NotFoundException('Could not find organization');
    }

    return organizationEntity;
  }

  async findMany(
    findOrganizationInput: QueryOrganizationInput,
  ): Promise<OrganizationEntity[]> {
    return;
  }

  async count(queryOrganizationInput: QueryOrganizationInput): Promise<any> {
    return;
  }
}
