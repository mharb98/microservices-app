import { Inject, Injectable } from '@nestjs/common';
import { InternalRole } from '@prisma/client';
import { InternalUserProducersService } from '../../users-producers/internal-user-producers/internal-user-producers.service';
import { InternalRolesRepository } from './repositories/internal-roles-repository.interface';

@Injectable()
export class InternalRolesService {
  constructor(
    @Inject('InternalRolesRepository')
    private repository: InternalRolesRepository,
    private internalUsersProducer: InternalUserProducersService,
  ) {}

  async addRoleToUser(
    internalProfileId: number,
    role: InternalRole,
  ): Promise<void> {
    await this.repository.create(internalProfileId, role);
  }

  async removeRoleFromUser(
    internalProfileId: number,
    role: InternalRole,
  ): Promise<void> {
    await this.repository.delete(internalProfileId, role);
    await this.internalUsersProducer.deleteModerator(internalProfileId);
  }
}
