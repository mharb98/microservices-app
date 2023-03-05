import { Injectable } from '@nestjs/common';
import { CreateCharityTypeDto } from './dtos/create-charity-type.dto';
import { UpdateCharityTypeDto } from './dtos/update-charity-type.dto';
import { CharityTypeEntity } from './entities/charity-type.entity';
import { CharityTypesRepository } from './repositories/charity-type.repository';

@Injectable()
export class CharityTypesService {
  constructor(private repository: CharityTypesRepository) {}

  async createCharityType(
    createCharityTypeDto: CreateCharityTypeDto,
  ): Promise<CharityTypeEntity> {
    return await this.repository.create(createCharityTypeDto);
  }

  async updateCharityType(
    charityTypeId: string,
    updateCharityTypeDto: UpdateCharityTypeDto,
  ): Promise<CharityTypeEntity> {
    return await this.repository.findOneAndUpdate(
      charityTypeId,
      updateCharityTypeDto,
    );
  }

  async getCharityTypeById(charityTypeId: string): Promise<CharityTypeEntity> {
    return await this.repository.findUnique(charityTypeId);
  }

  async getCharityTypes(): Promise<CharityTypeEntity[]> {
    return await this.repository.findMany({});
  }
}
