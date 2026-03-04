import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface CartAttributes {
  cartId: number;
  cartBuyer: number;
}

interface CartCreationAttributes extends Optional<CartAttributes, 'cartId'> {}

export class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public cartId!: number;
  public cartBuyer!: number;
}

Cart.init(
  {
    cartId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cartBuyer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'cart',
    timestamps: false,
  }
);
