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
        return this.pointModel.findByPk(icao)
    }

    async newPoint(pointCreationAttrs: pointsTypes.pointCreationAttrs) {
        return this.pointModel.create(pointCreationAttrs)
    }
}