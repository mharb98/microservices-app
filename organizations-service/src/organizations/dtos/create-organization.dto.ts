import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ type: String, example: 'Charity organization 1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'A charity group based in Cairo to help poor people',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: String, example: 'logo.png' })
  @IsString()
  @IsNotEmpty()
  logo: string;
}
