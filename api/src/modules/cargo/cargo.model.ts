import { Column, DataType, Model, Table } from "sequelize-typescript";
import * as cargoTypes from './cargo.types'

@Table({tableName: 'cargo'})
export class Cargo extends Model<Cargo, cargoTypes.cargoCreationAttrs> {
    @Column({type: DataType.STRING(8), allowNull: false})
    declare ticketId: string;

    @Column({type: DataType.TEXT, allowNull: false})
    declare flightNumber: string;

    @Column({type: DataType.STRING(8), allowNull: false, primaryKey: true})
    declare cargoId: string;
    
    @Column({type: DataType.INTEGER, allowNull: false})
    declare weight: number
}