import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";

export class DeleteCargoDto {
    @ApiProperty({ example: 'AB123456', description: 'Номер багажа' })
    @Matches(/^[A-Z]{2}\d{6}$/, {message: 'cargoId must be in format AB123456'})
    readonly cargoId: string
}

export class DeleteCargoMetaDto {
    @ApiProperty({ example: 'Cargo AB123456 deleted', description: 'Описание успешного выполнения' })
    context: string;
}

export class DeleteCargoResponseDto {
    @ApiProperty({ example: 200, description: 'Код ответа' })
    statusCode: number;

    @ApiProperty({ type: DeleteCargoMetaDto })
    meta: DeleteCargoMetaDto;
}