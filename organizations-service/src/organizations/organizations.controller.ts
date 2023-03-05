import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { QueryOrganizationDto } from './dtos/query-organizations.dto';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';
import QueryOrganizationsResult from './types/query-organizations-result.entity';
import { OrganizationEntity } from './entities/organization.entity';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @ApiCreatedResponse({
    description: 'Returns a new organization entity after being created!',
    type: OrganizationEntity,
  })
  @ApiConflictResponse({ description: 'Organization already exists.' })
  @ApiBadRequestResponse({ description: 'Missing or invalid params' })
  @Post()
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<OrganizationEntity> {
    return await this.organizationsService.create(createOrganizationDto);
  }

  @ApiOkResponse({
    description: 'Returns the organization entity after being updated!',
    type: OrganizationEntity,
  })
  @ApiConflictResponse({ description: 'Organization already exists.' })
  @ApiNotFoundResponse({
    description: 'Could not find the specified organization',
  })
  @ApiBadRequestResponse({ description: 'Invalid params' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<any> {
    return await this.organizationsService.update(id, updateOrganizationDto);
  }

  @ApiOkResponse({
    description:
      'Returns the organization entity based on id specified in request.',
    type: OrganizationEntity,
  })
  @ApiNotFoundResponse({ description: 'Organization not found.' })
  @ApiBadRequestResponse({ description: 'Could not return the organization' })
  @Get(':id')
  async findOrganizationById(
    @Param('id') id: string,
  ): Promise<OrganizationEntity> {
    return await this.organizationsService.findOrganizationById(id);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ description: 'Returns a list of organizations.' })
  @ApiBadRequestResponse({ description: 'Failed to load organizations' })
  @Get()
  async queryOrganizations(
    @Query() queryOrganizationsDto: QueryOrganizationDto,
  ): Promise<QueryOrganizationsResult> {
    return await this.organizationsService.queryOrganizations(
      queryOrganizationsDto,
    );
  }
}
