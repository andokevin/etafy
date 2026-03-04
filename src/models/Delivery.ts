import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface DeliveryAttributes {
  deliveryId: number;
  deliveryLocation?: string;
  deliveryStatus?: string;
  deliveryWorker?: number;
  deliveryOnline?: boolean;
}

interface DeliveryCreationAttributes extends Optional<DeliveryAttributes, 'deliveryId'> {}

export class Delivery extends Model<DeliveryAttributes, DeliveryCreationAttributes> implements DeliveryAttributes {
  public deliveryId!: number;
  public deliveryLocation?: string;
  public deliveryStatus?: string;
  public deliveryWorker?: number;
  public deliveryOnline?: boolean;
}

Delivery.init(
  {
    deliveryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    deliveryLocation: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    deliveryStatus: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    deliveryWorker: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'worker',
        key: 'worker_id',
      },
    },
    deliveryOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Delivery',
    tableName: 'delivery',
    timestamps: false,
  }
);
