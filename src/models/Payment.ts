import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface PaymentAttributes {
  paymentId: number;
  paymentOrder: number;
  paymentAmount: number;
  paymentMethod: string;
  paymentStatus?: string;
  paymentTransaction: string;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'paymentId' | 'paymentStatus'> {}

export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public paymentId!: number;
  public paymentOrder!: number;
  public paymentAmount!: number;
  public paymentMethod!: string;
  public paymentStatus?: string;
  public paymentTransaction!: string;
}

Payment.init(
  {
    paymentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    paymentOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'order_id',
      },
    },
    paymentAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.STRING(50),
      defaultValue: 'pending',
    },
    paymentTransaction: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: false,
  }
);
