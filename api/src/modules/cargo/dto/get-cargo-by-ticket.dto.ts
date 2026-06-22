import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";
import { Cargo } from "../cargo.model";

export class GetCargoByTicketDto {
    @ApiProperty({ example: 'AB123456', description: 'Номер билета' })
    @Matches(/^[A-Z]{2}\d{6}$/, {message: 'ticketId must be in format AB123456'})
    readonly ticketId: string
}

export class GetCargoByTicketMetaDto {
    @ApiProperty({ example: 'View all cargo for passanger AB123456', description: 'Описание успешного выполнения' })
    context: string;

    @ApiProperty({ example: [], description: 'Список всего багажа пассажира' })
    cargoList: Cargo[];
}

export class GetCargoByTicketResponseDto {
    @ApiProperty({ example: 200, description: 'Код ответа' })
    statusCode: number;

    @ApiProperty({ type: GetCargoByTicketMetaDto })
    meta: GetCargoByTicketMetaDto;
}