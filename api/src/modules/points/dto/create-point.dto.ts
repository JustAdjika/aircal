import * as pointsTypes from '../points.types'

export class CreatePointDto {
    readonly name: string;
    readonly type: pointsTypes.pointType;
    readonly ICAO: string;
    readonly IATA: string;
    readonly country: pointsTypes.country;
}