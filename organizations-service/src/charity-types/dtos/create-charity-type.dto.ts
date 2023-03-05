import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateCharityTypeDto {
    @ApiProperty({example: 'Money'})
    @IsString()
    name: string;
    
    @ApiProperty({example: 'Description of the charity type'})
    @IsString()
    description: string;

    @ApiPropertyOptional({example: 'logo.png'})
    @IsString()
    @IsOptional()
    logo: string;

    @ApiPropertyOptional({example: 'image.jpg'})
    @IsString()
    @IsOptional()
    image: string;
}