import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class OrganizationEntity extends Document {
  @ApiProperty({
    description: 'Name of the organization',
    type: String,
    example: 'Organization Name',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the organization',
    type: String,
    example: 'Organization that serves poor people in Egypt',
  })
  description: string;

  @ApiProperty({
    description: 'Logo path of the organization',
    type: String,
    example: 'Logo of the organization',
  })
  logo: string;
}
