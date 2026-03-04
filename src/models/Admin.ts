import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface AdminAttributes {
  adminId: number;
  adminWorker: number;
  adminRole: string;
  adminDeposit?: number;
  adminIsPro?: boolean;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, 'adminId'> {}

export class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
  public adminId!: number;
  public adminWorker!: number;
  public adminRole!: string;
  public adminDeposit?: number;
  public adminIsPro?: boolean;
}

Admin.init(
  {
    adminId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    adminWorker: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'worker',
        key: 'worker_id',
      },
    },
    adminRole: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    adminDeposit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'deposit',
        key: 'deposit_id',
      },
    },
    adminIsPro: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Admin',
    tableName: 'admin',
    timestamps: false,
  }
);
