import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface DepositAttributes {
  depositId: number;
  depositName?: string;
  depositProvince: number;
}

interface DepositCreationAttributes extends Optional<DepositAttributes, 'depositId'> {}

export class Deposit extends Model<DepositAttributes, DepositCreationAttributes> implements DepositAttributes {
  public depositId!: number;
  public depositName?: string;
  public depositProvince!: number;
}

Deposit.init(
  {
    depositId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    depositName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    depositProvince: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'province',
        key: 'province_id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Deposit',
    tableName: 'deposit',
    timestamps: false,
  }
);
