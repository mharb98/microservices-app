import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLocationDto {
    @ApiProperty({type: String, example: 'Cairo'})
    @IsString()
    province: string;

    @ApiProperty({type: String, example: 'Maadi'})
    @IsString()
    city: string;

    @ApiProperty({type: String, example: 'st.205 off El Horeya Road'})
    @IsString()
    address: string;

    @ApiPropertyOptional({type: Number, example: 29.1029301})
    @IsOptional()
    @IsNumber()
    lat?: number;

    @ApiPropertyOptional({type: Number, example: 40.12039450})
    @IsOptional()
    @IsNumber()
    long?: number;
}