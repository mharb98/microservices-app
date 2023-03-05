import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { OrganizationsCharityTypesService } from './organizations-charity-types.service';

@ApiTags('organizations-charity-types')
@Controller('organizations/:organizationId/organizationsCharityTypes')
export class OrganizationsCharityTypesController {
    constructor(private organizationCharityTypesService: OrganizationsCharityTypesService){}

    @ApiCreatedResponse({description: 'Returns charity type object after subscription'})
    @ApiConflictResponse({description: 'Organization already subscribed to this charity type.'})
    @ApiBadRequestResponse({description: 'Charity type does not exist.'})
    @ApiParam({name: 'organizationId'})
    @Post('subscribeToCharityType/:charityTypeId')
    async subscribeToCharityType(@Param('organizationId', ParseIntPipe) organizationId: number, @Param('charityTypeId', ParseIntPipe) charityTypeId: number): Promise<void> {
        await this.organizationCharityTypesService.subscribeToCharityType(organizationId, charityTypeId);
    }

    @ApiNoContentResponse({description: 'Unsubscribes form charity'})
    @ApiBadRequestResponse({description: 'The specified charity type does not exist anymore.'})
    @HttpCode(204)
    @Delete('unSubscribeFromCharityType/:charityTypeId')
    async unSubscribeToCharityType(@Param('organizationId', ParseIntPipe) organizationId: number, @Param('charityTypeId', ParseIntPipe) charityTypeId: number): Promise<void> {
        await this.organizationCharityTypesService.unSubscribeFromCharityType(organizationId, charityTypeId);
    }

    @ApiNoContentResponse({description: 'Returns a list of an organization charity types'})
    @ApiParam({name: 'organizationId'})
    @Get()
    async getOrganizationCharityTypes(@Param('organizationId', ParseIntPipe) organizationId: number): Promise<any> {
        return await this.organizationCharityTypesService.getOrganizationCharityTypes(organizationId);
    }

}
