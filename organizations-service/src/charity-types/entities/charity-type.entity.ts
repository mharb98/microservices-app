import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class CharityTypeEntity extends Document {
  @ApiProperty({
    type: String,
    example: 'Medical Charity',
    description: 'Name of the charity type',
  })
  name: string;

  @ApiProperty({
    type: String,
    example:
      'Charity type that aims to help the poor who can not afford medical insurance',
    description: 'Description for charity type',
  })
  description: string;

  @ApiProperty({
    type: String,
    example: 'logo.png',
    description: 'Logo path for charity type',
  })
  logo: string;

  @ApiProperty({
    type: String,
    example: 'image.jpg',
    description: 'Image path for charity type',
  })
  image: string;
}
