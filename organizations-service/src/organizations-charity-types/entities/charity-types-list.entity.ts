import { ApiProperty } from '@nestjs/swagger';
import { CharityTypeEntity } from '../../charity-types/entities/charity-type.entity';

export class CharityTypesListEntity {
  @ApiProperty({
    type: CharityTypeEntity,
    isArray: true,
  })
  charityTypes: CharityTypeEntity[];
}
