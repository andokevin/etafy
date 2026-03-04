import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface CartItemAttributes {
  cartId: number;
  productId: number;
  quantity: number;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'quantity'> {}

export class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
}

CartItem.init(
  {
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cart',
        key: 'cart_id',
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cart_item',
    timestamps: false,
  }
);
