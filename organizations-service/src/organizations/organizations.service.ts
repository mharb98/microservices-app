import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { QueryOrganizationDto } from './dtos/query-organizations.dto';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';
import QueryOrganizationsResult from './types/query-organizations-result.entity';
import { OrganizationEntity } from './entities/organization.entity';
import { OrganizationsRepository } from './repositories/organizations.repository';
import { ProducerService } from '../brokers/producer.service';

@Injectable()
export class OrganizationsService {
  constructor(
    private repository: OrganizationsRepository,
    private producerService: ProducerService,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<OrganizationEntity> {
    const organizationEntity = await this.repository.create({
      ...createOrganizationDto,
    });
    await this.producerService.produce('organizations', {
      key: 'create-organization',
      value: JSON.stringify({
        id: organizationEntity.id,
        name: organizationEntity.name,
      }),
    });
    return organizationEntity;
  }

  async update(
    organizationId: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<OrganizationEntity> {
    return await this.repository.findOneAndUpdate(
      organizationId,
      updateOrganizationDto,
    );
  }

  async findOrganizationById(
    organizationId: string,
  ): Promise<OrganizationEntity> {
    return await this.repository.findUnique(organizationId);
  }

  async queryOrganizations(
    queryOrganizationsDto: QueryOrganizationDto,
  ): Promise<QueryOrganizationsResult> {
    try {
      const organizations: OrganizationEntity[] =
        await this.repository.findMany(queryOrganizationsDto);
      const organizationsCount: any = await this.repository.count(
        queryOrganizationsDto,
      );
      return {
        organizations: organizations,
        count: organizationsCount,
      };
    } catch (error) {
      throw new BadRequestException('Failed to load organizations.');
    }
  }
}
