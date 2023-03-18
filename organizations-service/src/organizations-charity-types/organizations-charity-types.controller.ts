import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CharityTypesListEntity } from './entities/charity-types-list.entity';
import { organizationsListEntity } from './entities/organizations-list.entity';
import { OrganizationsCharityTypesService } from './organizations-charity-types.service';

@ApiTags('Organizations charity types')
@Controller()
export class OrganizationsCharityTypesController {
  constructor(
    private organizationCharityTypesService: OrganizationsCharityTypesService,
  ) {}

  @ApiCreatedResponse({
    description: 'Returns charity type object after subscription',
  })
  @ApiConflictResponse({
    description: 'Organization already subscribed to this charity type.',
  })
  @ApiNotFoundResponse({
    description: 'Charity type does not exist || Organization does not exist',
  })
  @Post(
    'organizations/:organizationId/charity-types/:charityTypeId/subscribe-to-charity-type',
  )
  async subscribeToCharityType(
    @Param('organizationId') organizationId: string,
    @Param('charityTypeId') charityTypeId: string,
  ): Promise<void> {
    await this.organizationCharityTypesService.subscribeToCharityType(
      organizationId,
      charityTypeId,
    );
  }

  @ApiNoContentResponse({ description: 'Unsubscribes form charity' })
  @ApiBadRequestResponse({
    description: 'The specified charity type does not exist anymore.',
  })
  @HttpCode(204)
  @Delete(
    'organizations/:organizationId/charity-types/:charityTypeId/unsubscribe-from-charity-type',
  )
  async unSubscribeToCharityType(
    @Param('organizationId') organizationId: string,
    @Param('charityTypeId') charityTypeId: string,
  ): Promise<void> {
    await this.organizationCharityTypesService.unSubscribeFromCharityType(
      organizationId,
      charityTypeId,
    );
  }

  @ApiOkResponse({
    description: 'Returns a list of an organization charity types',
    type: CharityTypesListEntity,
  })
  @ApiNotFoundResponse({
    description: 'Could not find the specified organization',
  })
  @Get('organizations/:organizationId/charity-types')
  async getOrganizationCharityTypes(
    @Param('organizationId') organizationId: string,
  ): Promise<any> {
    return await this.organizationCharityTypesService.getOrganizationCharityTypes(
      organizationId,
    );
  }

  @ApiOkResponse({
    description: 'Returns a list of organizations subscribed to charity types',
    type: organizationsListEntity,
  })
  @ApiNotFoundResponse({
    description: 'Could not find the specified charity type',
  })
  @Get('charity-types/:charityTypeId/organizations')
  async getCharityTypeOrganizations(
    @Param('charityTypeId') charityTypeId: string,
  ): Promise<any> {
    return await this.organizationCharityTypesService.getCharityTypeOrganizations(
      charityTypeId,
    );
  }
}
