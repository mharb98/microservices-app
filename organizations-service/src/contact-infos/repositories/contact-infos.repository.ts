import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactInfoEntity } from '../entities/contact-info.entity';
import { ContactInfo } from '../schema/contact-info.schema';
import CreateContactInfoInput from '../types/create-contact-info.interface';
import { QueryContactInfoInput } from '../types/query-contact-info.interface';
import UpdateContactInfoInput from '../types/update-contact-info.interface';

export class ContactInfosRepository {
  constructor(
    @InjectModel(ContactInfo.name)
    private contactInfoModel: Model<ContactInfoEntity>,
  ) {}

  async create(
    organizationId: string,
    createContactInfoInput: CreateContactInfoInput,
  ): Promise<ContactInfoEntity> {
    const contactInfoEntity = new this.contactInfoModel({
      ...createContactInfoInput,
      organization: organizationId,
    });

    try {
      return await contactInfoEntity.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Contact info has already been created');
      }
      throw new InternalServerErrorException(
        'Could not add organization contact info',
      );
    }
  }

  async findOneAndUpdate(
    contactInfoId: string,
    updateContactInfoInput: UpdateContactInfoInput,
  ): Promise<ContactInfoEntity> {
    const contactInfoEntity: ContactInfoEntity =
      await this.contactInfoModel.findById(contactInfoId);

    if (!contactInfoEntity) {
      throw new NotFoundException('Could not find the specified contact info');
    }
    try {
      return await this.contactInfoModel.findByIdAndUpdate(
        contactInfoId,
        updateContactInfoInput,
        { new: true },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not update organization contact info',
      );
    }
  }

  async updateMany(
    queryContactInfoInput: QueryContactInfoInput,
    updateContactInfoInput: UpdateContactInfoInput,
  ): Promise<void> {
    await this.contactInfoModel.updateMany(
      {
        ...queryContactInfoInput,
      },
      {
        ...updateContactInfoInput,
      },
    );
  }

  async findUnique(contactInfoId: string): Promise<ContactInfoEntity> {
    const contactInfoEntity: ContactInfoEntity =
      await this.contactInfoModel.findById(contactInfoId);

    if (!contactInfoEntity) {
      throw new NotFoundException(
        'Could not find the specified organization contact info',
      );
    }

    return contactInfoEntity;
  }

  async findMany(
    queryContactInfoInput: QueryContactInfoInput,
  ): Promise<ContactInfoEntity[]> {
    try {
      return await this.contactInfoModel.find({
        ...queryContactInfoInput,
      });
    } catch (error) {
      throw new InternalServerErrorException('Could not get contact Infos');
    }
  }

  async findByIdAndDelete(contactInfoId: string): Promise<void> {
    const contactInfoEntity: ContactInfoEntity =
      await this.contactInfoModel.findOneAndDelete({ _id: contactInfoId });

    if (!contactInfoEntity) {
      throw new NotFoundException(
        'Could not find the specified contact info id',
      );
    }
  }
}
