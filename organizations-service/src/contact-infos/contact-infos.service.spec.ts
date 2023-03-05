import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactInfosService } from './contact-infos.service';
import { CreateContactInfoDto } from './dtos/create-contact-info.dto';

describe('ContactInfosService', () => {
  let contactInfosService: ContactInfosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactInfosService],
    }).compile();

    contactInfosService = module.get<ContactInfosService>(ContactInfosService);
  });

  it('should be defined', () => {
    expect(contactInfosService).toBeDefined();
  });

  describe('createContactInfo', () => {
    it('Should return a contact info entity', async () => {
      const createContactInfoDto: CreateContactInfoDto = {
        type: 'Hotline',
        value: '19500',
      };

      const expected: CotnactInfoEntity = {
        id: expect.any(Number),
        ...createContactInfoDto,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        default: false,
        organization_id: 1,
      };

      const result = await contactInfosService.createContactInfo(
        1,
        createContactInfoDto,
      );

      expect(result).toEqual(expected);
    });

    it('Should return Conflict Exception for creating contact info that already exists', async () => {
      const createContactInfoDto: CreateContactInfoDto = {
        type: 'Hotline',
        value: '10101',
      };

      const result = contactInfosService.createContactInfo(
        1,
        createContactInfoDto,
      );

      await expect(result).rejects.toThrow(ConflictException);
    });

    it('Should return Bad Request Exception for creating contact info that already exists', async () => {
      const createContactInfoDto: CreateContactInfoDto = {
        type: 'Hotline',
        value: '10102',
      };

      const result = contactInfosService.createContactInfo(
        1,
        createContactInfoDto,
      );

      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteContactInfo', () => {
    it('Should return nothing after deleting the contact info entity', async () => {});

    it('Should return Not Found Exception', async () => {
      const result = contactInfosService.deleteContactInfo(1000);

      await expect(result).rejects.toThrow(NotFoundException);
    });

    it('Should return Bad Request Exception for failing to update', async () => {
      const result = contactInfosService.deleteContactInfo(1001);

      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('getOrganizationContactInfo', () => {
    it('Should return a list of organization contact infos', async () => {
      const result = await contactInfosService.getOrganizationContactInfo(1);

      const expected: CotnactInfoEntity = {
        ...contactInfoEntity,
        organization_id: 1,
      };

      expect(result).toEqual([expected]);
    });

    it('Should return Bad Request Exception for not fetching the contact infos', async () => {
      const result = contactInfosService.getOrganizationContactInfo(1000);

      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('setDefaultContactInfo', () => {
    it("Should return nothing after re-setting the organization's default contact info", async () => {});

    it('Should throw Not Found Exception for not finding a specific contact info', async () => {
      const expected = contactInfosService.setDefaultContactInfo(1, 2);
      await expect(expected).rejects.toThrow(NotFoundException);
    });

    it('Should throw Bad Request Exception for failing to reset the default contact info', async () => {
      const expected = contactInfosService.setDefaultContactInfo(1, 3);
      await expect(expected).rejects.toThrow(BadRequestException);
    });
  });
});
