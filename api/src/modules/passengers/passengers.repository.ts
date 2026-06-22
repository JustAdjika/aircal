import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Passenger } from "./passengers.model";

import * as passengersTypes from './passengers.types'

@Injectable()
export class PassengersRepository {
    constructor(
        @InjectModel(Passenger)
        private passengerModel: typeof Passenger
    ) {};

    async findByName(name: string) {
        return await this.passengerModel.findOne({ where: { name } });
    }

    async findBySeat(seat: string) {
        return await this.passengerModel.findOne({ where: { seat } });
    }

    async findByTicket(ticketId: string) {
        return await this.passengerModel.findByPk(ticketId);
    }

    async findByFlight(flightNumber: string) {
        return await this.passengerModel.findAll({ where: { flightNumber } });
    }

    async new(attrs: passengersTypes.passengersCreationAttrs) {
        return await this.passengerModel.create(attrs);
    }

    async delete(passenger: Passenger) {
        await passenger.destroy();
    }
}