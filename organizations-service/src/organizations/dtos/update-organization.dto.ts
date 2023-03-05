import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOrganizationDto {
  @ApiProperty({ type: String, example: 'Charity organization 1' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: String,
    example: 'A charity group based in Cairo to help poor people',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: String, example: 'logo.png' })
  @IsString()
  @IsOptional()
  logo?: string;
}
