import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class ModeratorEntity extends Document {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Internal profile id of the user in users service',
  })
  internalProfileId: number;

  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'Name of the moderator',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'johndoe@example.com',
    description: 'Email of the moderator',
  })
  email: string;
}
