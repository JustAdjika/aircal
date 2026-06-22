export interface passengersCreationAttrs {
    name: string;
    seat: string;
    flightNumber: string;
    ticketId: string;
    type: ticketType;
}

export enum ticketType {
    BUSINESS = "business",
    COMFORT = "comfort",
    CLASSIC = "classic"
}