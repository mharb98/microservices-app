import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryOrganizationDto {
  @ApiPropertyOptional({ type: String, example: 'Organization name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String, example: '19500' })
  @IsString()
  @IsOptional()
  contactValue?: string;

  @ApiPropertyOptional({ type: String, example: 'Cairo' })
  @IsString()
  @IsOptional()
  province?: string;

  @ApiPropertyOptional({ type: String, example: '1,2,3' })
  @Transform(({ value }) => {
    if (value) {
      return value.split(',').map(Number);
    }
    return value;
  })
  charityTypeIds?: number[];

  @ApiProperty({ type: Number, example: 1 })
  @Type(() => Number)
  pageSize: number;

  @ApiProperty({ type: Number, example: 10 })
  @Type(() => Number)
  page: number;
}
