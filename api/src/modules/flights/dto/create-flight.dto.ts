import { IsNumber, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Flight } from '../flights.model';

export class CreateFlightDto {
    @ApiProperty({ example: 'VSV3732', description: 'Номер рейса' })
    @IsString({message: 'Must be string'})
    readonly flightNumber: string;

    @ApiProperty({ example: 'UAAA', description: 'ИКАО аэропорта вылета' })
    @Matches(/^[A-Z]{4}$/, {message: 'departure ICAO contain exactly 4 uppercase Latin letters'})
    readonly departure: string;

    @ApiProperty({ example: 'UACC', description: 'ИКАО аэропорта прибытия' })
    @Matches(/^[A-Z]{4}$/, {message: 'arrival ICAO contain exactly 4 uppercase Latin letters'})
    readonly arrival: string;

    @ApiProperty({ example: 80, description: 'Время полета (в минутах)' })
    @IsNumber({}, {message: 'Must be number'})
    readonly blockTime: number;

    @ApiProperty({ example: 'UAAA SID ETEDA W333 TULPI L998 OGLAB N170 GIREM W333 BANOS STAR UACC', description: 'Маршрут полета' })
    @IsString({message: 'Must be string'})
    readonly route: string;
}

export class CreateFlightMetaDto {
    @ApiProperty({ example: 'Flight VSV3732 created', description: 'Описание успешного выполнения' })
    context: string;

    @ApiProperty({ 
        example: { 
            flightNumber: 'VSV3732', 
            status: 'checkin', 
            departure: 'UAAA', 
            arrival: 'UACC', 
            blockTime: 80, 
            route: 'UAAA SID ETEDA W333 TULPI L998 OGLAB N170 GIREM W333 BANOS STAR UACC'
        }, 
        description: 'Созданный рейс' 
    })
    newFlight: Flight
}

export class CreateFlightResponseDto {
    @ApiProperty({ example: 201, description: 'Код ответа' })
    statusCode: number;
    
    @ApiProperty({ type: CreateFlightMetaDto })
    meta: CreateFlightMetaDto
}