import { IsEnum, IsString, Matches } from 'class-validator';
import * as pointsTypes from '../points.types'
import { ApiProperty } from '@nestjs/swagger';

export class CreatePointDto {
    @ApiProperty({ example: 'Almaty International Airport', description: 'Название аэропорта' })
    @IsString({message: 'Must be string'})
    readonly name: string;
    
    @ApiProperty({ example: 'international', description: 'Тип аэропорта' })
    @IsEnum(pointsTypes.pointType)
    readonly type: pointsTypes.pointType;
    
    @ApiProperty({ example: 'UAAA', description: 'ИКАО код аэропорта' })
    @Matches(/^[A-Z]{4}$/, {message: 'ICAO contain exactly 4 uppercase Latin letters'})
    readonly ICAO: string;
    
    @ApiProperty({ example: 'ALA', description: 'ИАТА код аэропорта' })
    @Matches(/^[A-Z]{3}$/, {message: 'ICAO contain exactly 3 uppercase Latin letters'})
    readonly IATA: string;
    
    @ApiProperty({ example: 'kz', description: 'Код страны аэропорта' })
    @IsEnum(pointsTypes.country)
    readonly country: pointsTypes.country;
}

export class CreatePointMetaDto {
    @ApiProperty({ example: 'Point UAAA created', description: 'Описание успешного выполнения' })
    context: string
}

export class CreatePointResponseDto {
    @ApiProperty({ example: 201, description: 'Код ответа' })
    statusCode: number;
    
    @ApiProperty({ type: CreatePointMetaDto })
    meta: CreatePointMetaDto
}