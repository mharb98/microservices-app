import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { ContactInfoType } from '../types/contact-info-type.enum';

export class CreateContactInfoDto {
  @ApiProperty({
    description: 'Type of organization contact info',
    type: PartialType<ContactInfoType>,
    example: ContactInfoType.Hotline,
  })
  @IsEnum(ContactInfoType)
  type: ContactInfoType;

  @ApiProperty({ type: String, example: '19xxx' })
  @IsString()
  value: string;
}
