import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface ProductAttributes {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productSeller: number;
  productQuantity?: number;
  productBrand: number;
  productCategory: number;
  productGenre: string;
  productSecondHand?: boolean;
  productStatus: string;
  productSize: string;
  productFabric: string;
  productWithDefault?: boolean;
  productDefaultDescription?: string;
  productColor: string;
  productLikeCount?: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'productId' | 'productQuantity' | 'productSecondHand' | 'productWithDefault' | 'productDefaultDescription' | 'productLikeCount'> {}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public productId!: number;
  public productName!: string;
  public productDescription!: string;
  public productPrice!: number;
  public productSeller!: number;
  public productQuantity?: number;
  public productBrand!: number;
  public productCategory!: number;
  public productGenre!: string;
  public productSecondHand?: boolean;
  public productStatus!: string;
  public productSize!: string;
  public productFabric!: string;
  public productWithDefault?: boolean;
  public productDefaultDescription?: string;
  public productColor!: string;
  public productLikeCount?: number;
}

Product.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productSeller: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'seller',
        key: 'seller_id',
      },
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    productBrand: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'brand',
        key: 'brand_id',
      },
    },
    productCategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'category_id',
      },
    },
    productGenre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    productSecondHand: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    productStatus: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    productSize: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    productFabric: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    productWithDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    productDefaultDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    productColor: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    productLikeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'product',
    timestamps: false,
  }
);
