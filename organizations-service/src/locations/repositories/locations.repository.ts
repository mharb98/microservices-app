import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LocationEntity } from '../entities/location.entity';
import { Location } from '../schema/location.schema';
import CreateLocationInput from '../types/create-location-input.interface';
import QueryLocationInput from '../types/query-location-input.interface';
import UpdateLocationInput from '../types/update-location-inputs.interface';

export class LocationsRepository {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationEntity>,
  ) {}

  async create(
    organizationId: string,
    createLocationInput: CreateLocationInput,
  ): Promise<LocationEntity> {
    const locationEntity = new this.locationModel({
      ...createLocationInput,
      organization: organizationId,
    });

    try {
      return await locationEntity.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not add organization location',
      );
    }
  }

  async findOneAndUpdate(
    locationId: string,
    updateLocationInput: UpdateLocationInput,
  ): Promise<LocationEntity> {
    const locationEntity = await this.locationModel.findById(locationId);

    if (!locationEntity) {
      throw new NotFoundException('Could not find the specified location');
    }
    try {
      return await this.locationModel.findByIdAndUpdate(
        locationId,
        updateLocationInput,
        { new: true },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not update organization location',
      );
    }
  }

  async updateMany(
    queryLocationInput: QueryLocationInput,
    updateLocationInput: UpdateLocationInput,
  ): Promise<void> {
    await this.locationModel.updateMany(
      {
        ...queryLocationInput,
      },
      {
        ...updateLocationInput,
      },
    );
  }

  async findUnique(locationId: string): Promise<LocationEntity> {
    const locationEntity: LocationEntity = await this.locationModel.findById(
      locationId,
    );

    if (!locationEntity) {
      throw new NotFoundException(
        'Could not find the specified organization location',
      );
    }

    return locationEntity;
  }

  async findMany(
    queryLocationInput: QueryLocationInput,
  ): Promise<LocationEntity[]> {
    try {
      return await this.locationModel.find({
        ...queryLocationInput,
      });
    } catch (error) {
      throw new InternalServerErrorException('Could not get locations');
    }
  }

  async findByIdAndDelete(locationId: string): Promise<void> {
    const locationEntity: LocationEntity =
      await this.locationModel.findOneAndDelete({ _id: locationId });

    if (!locationEntity) {
      throw new NotFoundException('Could not find the specified location');
    }
  }
}
