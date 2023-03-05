import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class LocationEntity extends Document {
  @ApiProperty({
    type: String,
    example: 'Cairo',
    description: 'The city where the organization location exists',
  })
  province: string;

  @ApiProperty({
    type: String,
    example: 'Maadi',
    description: 'The city in the province where the location exists',
  })
  city: string;

  @ApiProperty({
    type: Number,
    example: 22.12445,
    description: 'Latitude of the location',
  })
  lat: number;

  @ApiProperty({
    type: Number,
    example: 23.12345,
    description: 'Longitude of the location',
  })
  longitude: number;

  @ApiProperty({
    type: String,
    example: 'Street 286, Cairo, Egypt',
    description: 'Exact address of the location',
  })
  address: string;

  @ApiProperty({
    type: Boolean,
    example: false,
    description:
      'A flag that states if the location is main location for the organization',
  })
  default: boolean;

  @ApiProperty({
    type: String,
    example: '63c6fda8b7e76cef951a5175',
    description: 'ID of the organization',
  })
  organization: string;
}
