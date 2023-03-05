import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dtos/create-location.dto';
import { LocationEntity } from './entities/location.entity';

@ApiTags('locations')
@ApiNotFoundResponse({ description: 'Organization or location does not exist' })
@Controller('organizations/:organizationId/locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @ApiCreatedResponse({
    description: 'Returns an organization object after creation',
  })
  @ApiBadRequestResponse({ description: 'Invalid or missing params' })
  @Post()
  async createOrganizationLocation(
    @Param('organizationId') organizationId: string,
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<LocationEntity> {
    return await this.locationsService.createOrganizationLocation(
      organizationId,
      createLocationDto,
    );
  }

  @ApiNoContentResponse({ description: 'Deletes organization location' })
  @ApiParam({ name: 'organizationId' })
  @HttpCode(204)
  @Delete(':locationId')
  async deleteOrganizationLocation(@Param('locationId') locationId: string) {
    await this.locationsService.deleteOrganizationLocation(locationId);
  }

  @ApiOkResponse({ description: 'Returns a list of organizationsLocations' })
  @Get()
  async getOrganizationLocations(
    @Param('organizationId') organizationId: string,
  ): Promise<LocationEntity[]> {
    return await this.locationsService.getOrganizationLocations(organizationId);
  }

  @ApiNoContentResponse({ description: 'Sets a specific location as default' })
  @ApiParam({ name: 'organizationId' })
  @HttpCode(204)
  @Patch(':locationId/setDefaultLocaiton')
  async setDefaultOrganizationLocation(
    @Param('organizationId') organizationId: string,
    @Param('locationId') locationId: string,
  ): Promise<void> {
    await this.locationsService.setDefaultOrganizationLocation(
      organizationId,
      locationId,
    );
  }
}
