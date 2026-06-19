import { Column, DataType, Model, Table } from "sequelize-typescript";
import * as pointsTypes from './points.types'

@Table({tableName: 'points'})
export class Point extends Model<Point, pointsTypes.pointCreationAttrs> {
    @Column({type: DataType.TEXT, allowNull: false})
    name: string;
    
    @Column({type: DataType.TEXT, allowNull: false})
    type: pointsTypes.pointType;

    @Column({type: DataType.STRING(4), unique: true, primaryKey: true})
    ICAO: string;

    @Column({type: DataType.TEXT, allowNull: false})
    IATA: string;

    @Column({type: DataType.TEXT, allowNull: false})
    country: pointsTypes.country;
}