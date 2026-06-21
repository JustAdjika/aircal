export interface pointCreationAttrs {
    name: string;
    type: pointType;
    ICAO: string;
    IATA: string;
    country: country;
}

export enum pointType {
    INTER = 'international',
    DOM = 'domestic'
}

export enum country {
    AZ = 'az',
    AM = 'am',
    BY = 'by',
    KZ = 'kz',
    KG = 'kg',
    MD = 'md',
    RU = 'ru',
    TJ = 'tj',
    UZ = 'uz'
}