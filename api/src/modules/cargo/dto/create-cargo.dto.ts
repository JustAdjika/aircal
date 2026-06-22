import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Matches } from "class-validator";

export class CreateCargoDto {
    @ApiProperty({ example: 'AB123456', description: 'Номер билета' })
    @Matches(/^[A-Z]{2}\d{6}$/, {message: 'ticketId must be in format AB123456'})
    readonly ticketId: string;

    @ApiProperty({ example: 'VSV3732', description: 'Номер рейса' })
    @IsString({message: 'Must be string'})
    readonly flightNumber: string;
    
    @ApiProperty({ example: '23', description: 'Вес (в КГ)' })
    @IsNumber({}, {message: 'Must be number'})
    readonly weight: number
}

export class CreateCargoMetaDto {
    @ApiProperty({ example: 'Cargo AB123456 registered', description: 'Описание успешного выполнения' })
    context: string;

    @ApiProperty({ example: 'AB123456', description: 'Номер багажа' })
    cargoId: string
}

export class CreateCargoResponseDto {
    @ApiProperty({ example: 201, description: 'Код ответа' })
    statusCode: number;

    @ApiProperty({ type: CreateCargoMetaDto })
    meta: CreateCargoMetaDto;
}