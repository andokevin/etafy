import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface OrderAttributes {
  orderId: number;
  orderBuyer: number;
  orderSeller: number;
  orderProduct: number;
  orderAmount: number;
  orderStatus?: string;
  orderPaymentStatus?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'orderId' | 'orderStatus' | 'orderPaymentStatus' | 'createdAt' | 'updatedAt'> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public orderId!: number;
  public orderBuyer!: number;
  public orderSeller!: number;
  public orderProduct!: number;
  public orderAmount!: number;
  public orderStatus?: string;
  public orderPaymentStatus?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Order.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderBuyer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    orderSeller: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'seller',
        key: 'seller_id',
      },
    },
    orderProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'product_id',
      },
    },
    orderAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.STRING(50),
      defaultValue: 'pending',
    },
    orderPaymentStatus: {
      type: DataTypes.STRING(50),
      defaultValue: 'unpaid',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false,
  }
);
