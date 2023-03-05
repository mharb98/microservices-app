import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class ContactInfoEntity extends Document {
  @ApiProperty({
    type: String,
    example: 'Hotline',
    description: 'Type of the contact info',
  })
  type: string;

  @ApiProperty({
    type: String,
    example: '19900',
    description: 'Value of the contact info',
  })
  value: string;
}
