import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateCharityTypeDto{
    @ApiPropertyOptional({example: 'Money'})
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({example: 'Description of the charity type'})
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({example: 'logo.png'})
    @IsString()
    @IsOptional()
    logo?: string;

    @ApiPropertyOptional({example: 'image.jpg'})
    @IsString()
    @IsOptional()
    image?: string;
}