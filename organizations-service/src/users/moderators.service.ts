import { Injectable } from '@nestjs/common';
import { ModeratorEntity } from './entities/moderator.entity';
import { CreateModeratorInput } from './interfaces/create-moderator-input.interface';
import { ModeratorsRepository } from './repositories/moderators.repository';

@Injectable()
export class ModeratorsService {
  constructor(private repository: ModeratorsRepository) {}

  async createModerator(
    createModeratorInput: CreateModeratorInput,
  ): Promise<ModeratorEntity> {
    return await this.repository.create(createModeratorInput);
  }

  async deleteModerator(internalProfileId: number): Promise<void> {
    await this.repository.findByIdAndDelete(internalProfileId);
  }
}
