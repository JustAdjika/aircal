import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Flight } from "./flights.model";

import * as flightsTypes from './flights.types'

@Injectable()
export class FlightsRepository {
    constructor(
        @InjectModel(Flight) 
        private flightModel: typeof Flight
    ) {}

    async findByFlightNumber(flightNumber: string) {
        return await this.flightModel.findByPk(flightNumber);
    }

    async findAll() {
        return await this.flightModel.findAll();
    }

    async new(attrs: flightsTypes.flightsCreationAttrs) {
        return await this.flightModel.create(attrs)
    }

    async updateStatus(flight: Flight, status: flightsTypes.flightsStatus) {
        await flight.update({ status })
    }
}