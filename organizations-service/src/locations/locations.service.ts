import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dtos/create-location.dto';
import { LocationEntity } from './entities/location.entity';
import { LocationsRepository } from './repositories/locations.repository';

@Injectable()
export class LocationsService {
  constructor(private repository: LocationsRepository) {}

  async createOrganizationLocation(
    organizationId: string,
    createLocationDto: CreateLocationDto,
  ): Promise<LocationEntity> {
    return await this.repository.create(organizationId, {
      ...createLocationDto,
    });
  }

  async deleteOrganizationLocation(locationId: string): Promise<void> {
    await this.repository.findByIdAndDelete(locationId);
  }

  async getOrganizationLocations(
    organizationId: string,
  ): Promise<LocationEntity[]> {
    return await this.repository.findMany({
      organization: organizationId,
    });
  }

  async setDefaultOrganizationLocation(
    organizationId: string,
    locationId: string,
  ): Promise<void> {
    this.repository.updateMany(
      { organization: organizationId },
      { default: false },
    );
    this.repository.findOneAndUpdate(locationId, { default: true });
  }
}
