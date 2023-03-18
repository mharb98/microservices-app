import { ConflictException, Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModeratorEntity } from '../entities/moderator.entity';
import { CreateModeratorInput } from '../interfaces/create-moderator-input.interface';
import { Moderator } from '../schema/moderator.schema';

@Injectable()
export class ModeratorsRepository {
  constructor(
    @InjectModel(Moderator.name) private moderatorModel: Model<ModeratorEntity>,
  ) {}

  async create(
    createModeratorInput: CreateModeratorInput,
  ): Promise<ModeratorEntity> {
    const moderatorEntity = new this.moderatorModel({
      ...createModeratorInput,
    });

    try {
      return await moderatorEntity.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Organization has already been created');
      }

      throw new InternalServerErrorException('Could not add moderator');
    }
  }

  async findByIdAndDelete(internalProfileId: number): Promise<void> {
    const moderatorEntity: ModeratorEntity =
      await this.moderatorModel.findOneAndDelete({
        internalProfileId: internalProfileId,
      });

    if (!moderatorEntity) {
      throw new NotFoundException('Could not find the specified moderator');
    }
  }
}
