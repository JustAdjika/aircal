export interface flightsCreationAttrs {
    flightNumber: string;
    status: flightsStatus;
    departure: string;
    arrival: string;
    blockTime: number;
    route: string;
} 

export enum flightsStatus {
    CHECK_IN = 'checkin',
    BOARDING = 'boarding',
    GATE_CLOSING = 'gateclosing',
    FINAL_CALL = 'finalcall',
    DELAYED = 'delayed',
    CANCELLED = 'cancelled',
    IN_FLIGHT = 'inflight',
    ARRIVED = 'arrived',
    DIVERTED = 'diverted'
}