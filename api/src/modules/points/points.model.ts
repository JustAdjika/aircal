import { Column, DataType, Model, Table } from "sequelize-typescript";
import * as pointsTypes from './points.types'

@Table({tableName: 'points'})
export class Point extends Model<Point, pointsTypes.pointCreationAttrs> {
    @Column({type: DataType.TEXT, allowNull: false})
    declare name: string;
    
    @Column({type: DataType.TEXT, allowNull: false})
    declare type: pointsTypes.pointType;

    @Column({type: DataType.STRING(4), unique: true, primaryKey: true})
    declare ICAO: string;

    @Column({type: DataType.STRING(3), allowNull: false})
    declare IATA: string;

    @Column({type: DataType.TEXT, allowNull: false})
    declare country: pointsTypes.country;
}