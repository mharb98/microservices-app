import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CharityTypesService } from './charity-types.service';
import { CreateCharityTypeDto } from './dtos/create-charity-type.dto';
import { UpdateCharityTypeDto } from './dtos/update-charity-type.dto';
import { CharityTypeEntity } from './entities/charity-type.entity';

@Controller('charityTypes')
@ApiTags('charityTypes')
export class CharityTypesController {
  constructor(private charityTypeService: CharityTypesService) {}

  @ApiCreatedResponse({
    description: 'Returns a charity type object after being created.',
    type: CharityTypeEntity,
  })
  @ApiConflictResponse({ description: 'This charity type already exists' })
  @ApiBadRequestResponse({ description: 'Missing or invalid params' })
  @Post()
  async createCharityTypes(
    @Body() createCharityTypeDto: CreateCharityTypeDto,
  ): Promise<CharityTypeEntity> {
    return await this.charityTypeService.createCharityType(
      createCharityTypeDto,
    );
  }

  @ApiOkResponse({
    description: 'Returns a charity type object after being editted',
    type: CharityTypeEntity,
  })
  @ApiConflictResponse({ description: 'The charity type already exists' })
  @ApiNotFoundResponse({ description: 'Charity type does not exist.' })
  @Patch(':charityTypeId')
  async updateCharityType(
    @Param('charityTypeId') charityTypeId: string,
    @Body() updateCharityTypeDto: UpdateCharityTypeDto,
  ): Promise<CharityTypeEntity> {
    return await this.charityTypeService.updateCharityType(
      charityTypeId,
      updateCharityTypeDto,
    );
  }

  @ApiOkResponse({
    description: 'Returns a charity type entity',
    type: CharityTypeEntity,
  })
  @ApiNotFoundResponse({
    description: 'The charity type specified does not exist.',
  })
  @Get(':charityTypeId')
  async getCharityTypeById(
    @Param('charityTypeId') charityTypeId: string,
  ): Promise<CharityTypeEntity> {
    return await this.charityTypeService.getCharityTypeById(charityTypeId);
  }

  @ApiOkResponse({ description: 'Returns a list of all charity types' })
  @Get()
  async getCharityTypes(): Promise<CharityTypeEntity[]> {
    return await this.charityTypeService.getCharityTypes();
  }
}
