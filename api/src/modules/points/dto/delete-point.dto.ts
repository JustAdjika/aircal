import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";

export class DeletePointDto {
    @ApiProperty({ example: 'UAAA', description: 'ИКАО код аэропорта' })
    @Matches(/^[A-Z]{4}$/, {message: 'ICAO contain exactly 4 uppercase Latin letters'})
    readonly ICAO: string;
}

export class DeletePointMetaDto {
    @ApiProperty({ example: 'Point UAAA deleted', description: 'Описание успешного выполнения' })
    context: string
}

export class DeletePointResponseDto {
    @ApiProperty({ example: 200, description: 'Код ответа' })
    statusCode: number;

    @ApiProperty({ type: DeletePointMetaDto })
    meta: DeletePointMetaDto
}