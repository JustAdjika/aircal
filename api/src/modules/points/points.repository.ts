import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Point } from "./points.model";
import * as pointsTypes from "./points.types";

@Injectable()
export class PointsRepository {
    constructor(
        @InjectModel(Point)
        private pointModel: typeof Point
    ) {}

    async findByICAO(icao: string) {
        return await this.pointModel.findByPk(icao)
    }

    async findByIATA(iata: string) {
        return await this.pointModel.findOne({ where: { IATA: iata } })
    }

    async newPoint(pointCreationAttrs: pointsTypes.pointCreationAttrs) {
        await this.pointModel.create(pointCreationAttrs)
    }
}