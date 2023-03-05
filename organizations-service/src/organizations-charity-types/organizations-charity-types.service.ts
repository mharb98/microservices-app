import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class OrganizationsCharityTypesService {
  constructor() {}

  async subscribeToCharityType(
    organizationId: number,
    charityTypeId: number,
  ): Promise<void> {
    try {
    } catch (error) {}
  }

  async unSubscribeFromCharityType(
    organizationId: number,
    charityTypeId: number,
  ): Promise<any> {
    try {
    } catch (error) {}
  }

  async getOrganizationCharityTypes(organizationId: number): Promise<any> {
    try {
    } catch (error) {}
  }
}
