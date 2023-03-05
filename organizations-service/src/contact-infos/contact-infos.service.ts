import { Injectable } from '@nestjs/common';
import { CreateContactInfoDto } from './dtos/create-contact-info.dto';
import { ContactInfoEntity } from './entities/contact-info.entity';
import { ContactInfosRepository } from './repositories/contact-infos.repository';

@Injectable()
export class ContactInfosService {
  constructor(private repository: ContactInfosRepository) {}
  async createContactInfo(
    organizationId: string,
    createContactInfoDto: CreateContactInfoDto,
  ): Promise<ContactInfoEntity> {
    return await this.repository.create(organizationId, createContactInfoDto);
  }

  async deleteContactInfo(contactInfoId: string): Promise<void> {
    await this.repository.findByIdAndDelete(contactInfoId);
  }

  async getOrganizationContactInfo(
    organizationId: string,
  ): Promise<ContactInfoEntity[]> {
    return await this.repository.findMany({
      organization: organizationId,
    });
  }

  async setDefaultContactInfo(
    organizationId: string,
    contactInfoId: string,
  ): Promise<void> {
    await this.repository.updateMany(
      { organization: organizationId, default: true },
      { default: false },
    );
    await this.repository.findOneAndUpdate(contactInfoId, { default: true });
  }
}
