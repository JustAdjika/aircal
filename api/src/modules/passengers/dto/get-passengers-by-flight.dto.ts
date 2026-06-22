import { IsEnum, IsNumber, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Passenger } from '../passengers.model';

export class GetByFlightNumber {
    @ApiProperty({ example: 'AB123456', description: 'Номер билета' })
    @Matches(/^[A-Z]{2}\d{6}$/, {message: 'ticketId must be in format AB123456'})
    readonly ticketId: string
}

export class DeletePassengerMetaDto {
    @ApiProperty({ example: 'Passenger AB123456 deleted', description: 'Описание успешного выполнения' })
    context: string;
}

export class DeletePassengerResponseDto {
    @ApiProperty({ example: 200, description: 'Код ответа' })
    statusCode: number;
    
    @ApiProperty({ type: DeletePassengerMetaDto })
    meta: DeletePassengerMetaDto
}



export class GetPassengersByFlightDto {
    @ApiProperty({ example: 'VSV3732', description: 'Номер рейса' })
    @IsString({ message: 'Must be string' })
    readonly flightNumber: string
}

export class GetPassengersByFlightMetaDto {
    @ApiProperty({ example: 'View all passengers for flight VSV3732', description: 'Описание успешного выполнения' })
    context: string;

    @ApiProperty({ example: [], description: 'Список всех пассажиров рейса' })
    passengerList: Passenger[];
}

export class GetPassengersByFlightResponseDto {
    @ApiProperty({ example: 200, description: 'Код ответа' })
    statusCode: number;

    @ApiProperty({ type: GetPassengersByFlightMetaDto })
    meta: GetPassengersByFlightMetaDto;
}