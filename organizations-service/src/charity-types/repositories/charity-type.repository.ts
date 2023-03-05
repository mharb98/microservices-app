import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryContactInfoInput } from '../../contact-infos/types/query-contact-info.interface';
import { CharityTypeEntity } from '../entities/charity-type.entity';
import { CharityType } from '../schema/charity-type.schema';
import CreateCharityTypeInput from '../types/create-charity-type-input.interface';
import UpdateCharityTypeInput from '../types/update-charity-type-input.interface';

export class CharityTypesRepository {
  constructor(
    @InjectModel(CharityType.name)
    private charityTypeModel: Model<CharityTypeEntity>,
  ) {}

  async create(
    createCharityTypeInput: CreateCharityTypeInput,
  ): Promise<CharityTypeEntity> {
    const locationEntity = new this.charityTypeModel({
      ...createCharityTypeInput,
    });

    try {
      return await locationEntity.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Organization has already been created');
      }
      throw new InternalServerErrorException('Could not add charity type');
    }
  }

  async findOneAndUpdate(
    charityTypeId: string,
    updateCharityTypeInput: UpdateCharityTypeInput,
  ): Promise<CharityTypeEntity> {
    const charityTypeEntity: CharityTypeEntity =
      await this.charityTypeModel.findById(charityTypeId);

    if (!charityTypeEntity) {
      throw new NotFoundException('Could not find the specified charity type');
    }
    try {
      return await this.charityTypeModel.findByIdAndUpdate(
        charityTypeId,
        updateCharityTypeInput,
        { new: true },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not update organization charity type',
      );
    }
  }

  async findUnique(charityTypeId: string): Promise<CharityTypeEntity> {
    const charityTypeEntity: CharityTypeEntity =
      await this.charityTypeModel.findById(charityTypeId);

    if (!charityTypeEntity) {
      throw new NotFoundException('Could not find the specified charity type');
    }

    return charityTypeEntity;
  }

  async findMany(
    queryCharityTypeInput: QueryContactInfoInput,
  ): Promise<CharityTypeEntity[]> {
    try {
      return await this.charityTypeModel.find({
        ...queryCharityTypeInput,
      });
    } catch (error) {
      throw new InternalServerErrorException('Could not get charity types');
    }
  }

  async findByIdAndDelete(charityTypeId: string): Promise<void> {
    const charityTypeEntity: CharityTypeEntity =
      await this.charityTypeModel.findOneAndDelete({ _id: charityTypeId });

    if (!charityTypeEntity) {
      throw new NotFoundException('Could not find the specified charity type');
    }
  }
}
