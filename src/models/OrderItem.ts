import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface OrderItemAttributes {
  orderId: number;
  productId: number;
  itemQuantity: number;
  itemPrice: number;
  itemTotalPrice: number;
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'itemPrice' | 'itemTotalPrice'> {}

export class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public orderId!: number;
  public productId!: number;
  public itemQuantity!: number;
  public itemPrice!: number;
  public itemTotalPrice!: number;
}

OrderItem.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'order_id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'product_id',
      },
    },
    itemQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    itemTotalPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
    timestamps: false,
  }
);
