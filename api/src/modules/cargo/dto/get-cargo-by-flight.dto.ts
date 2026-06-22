import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Cargo } from "../cargo.model";

export class GetCargoByFlightDto {
    @ApiProperty({ example: 'VSV3732', description: 'Номер рейса' })
    @IsString({ message: 'Must be string' })
    readonly flightNumber: string
}

export class GetCargoByFlightMetaDto {
    @ApiProperty({ example: 'View all cargo for flight VSV3732', description: 'Описание успешного выполнения' })
    context: string;

    @ApiProperty({ example: [], description: 'Список всего багажа рейса' })
    cargoList: Cargo[];
}

export class GetCargoByFlightResponseDto {
    @ApiProperty({ example: 200, description: 'Код ответа' })
    statusCode: number;

    @ApiProperty({ type: GetCargoByFlightMetaDto })
    meta: GetCargoByFlightMetaDto;
}