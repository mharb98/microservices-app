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
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ContactInfosService } from './contact-infos.service';
import { CreateContactInfoDto } from './dtos/create-contact-info.dto';
import { ContactInfoEntity } from './entities/contact-info.entity';

@ApiTags('contactInfos')
@ApiNotFoundResponse({
  description: 'Organization or contact info does not exist.',
})
@Controller('organizations/:organizationId/contactInfos')
export class ContactInfosController {
  constructor(private contactInfosService: ContactInfosService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Returns contact info after creation',
    type: ContactInfoEntity,
  })
  @ApiConflictResponse({
    description: 'This contact info value already exists.',
  })
  @ApiBadRequestResponse({ description: 'Invalid or missing params' })
  async createContactInfo(
    @Param('organizationId') organizationId: string,
    @Body() createContactInfoDto: CreateContactInfoDto,
  ): Promise<ContactInfoEntity> {
    return await this.contactInfosService.createContactInfo(
      organizationId,
      createContactInfoDto,
    );
  }

  @ApiNoContentResponse({ description: 'Contact info successfully deleted!' })
  @ApiParam({ name: 'organizationId' })
  @Delete(':contactInfoId')
  async deleteContactInfo(
    @Param('contactInfoId') contactInfoId: string,
  ): Promise<void> {
    await this.contactInfosService.deleteContactInfo(contactInfoId);
  }

  @ApiOkResponse({ description: "Returns all organization's contact info." })
  @Get()
  async getOrganizationContactInfo(
    @Param('organizationId') organizationId: string,
  ): Promise<ContactInfoEntity[]> {
    return await this.contactInfosService.getOrganizationContactInfo(
      organizationId,
    );
  }

  @ApiNoContentResponse({ description: 'Sets a contact info as the default.' })
  @ApiParam({ name: 'organizationId' })
  @HttpCode(204)
  @Patch('setDefaultContactInfo/:contactInfoId')
  async setDefaultContactInfo(
    @Param('organizationId') organizationId: string,
    @Param('contactInfoId') contactInfoId: string,
  ): Promise<void> {
    await this.contactInfosService.setDefaultContactInfo(
      organizationId,
      contactInfoId,
    );
  }
}
