import { ApiProperty } from '@nestjs/swagger';
import { OrganizationEntity } from '../../organizations/entities/organization.entity';

export class organizationsListEntity {
  @ApiProperty({
    type: OrganizationEntity,
    isArray: true,
  })
  organizations: OrganizationEntity[];
}
