import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Cargo } from "./cargo.model";

import * as cargoTypes from './cargo.types'

@Injectable()
export class CargoRepository {
    constructor(
        @InjectModel(Cargo)
        private cargoModel: typeof Cargo
    ) {};

    async findByTicket(ticketId: string) {
        return await this.cargoModel.findAll({ where: { ticketId } });
    }

    async findByCargoId(cargoId: string) {
        return await this.cargoModel.findByPk(cargoId);
    } 

    async findByFlightNumber(flightNumber: string) {
        return await this.cargoModel.findAll({ where: { flightNumber } });
    }

    async new(dto: cargoTypes.cargoCreationAttrs) {
        return await this.cargoModel.create(dto);
    }

    async delete(cargo: Cargo) {
        await cargo.destroy();
    }
}