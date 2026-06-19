export type pointType = 'international' | 'domestic'
export type country = 'az' | 'am' | 'by' | 'kz' | 'kg' | 'md' | 'ru' | 'tj' | 'uz'

export interface pointCreationAttrs {
    name: string;
    type: pointType;
    ICAO: string;
    IATA: string;
    country: country;
}