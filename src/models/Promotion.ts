import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface PromotionAttributes {
  promotionId: number;
  promotionSeller: number;
  promotionProduct: number;
  promotionValue: number;
  promotionDetails?: string;
  promotionStart: Date;
  promotionEnd: Date;
}

interface PromotionCreationAttributes extends Optional<PromotionAttributes, 'promotionId'> {}

export class Promotion extends Model<PromotionAttributes, PromotionCreationAttributes> implements PromotionAttributes {
  public promotionId!: number;
  public promotionSeller!: number;
  public promotionProduct!: number;
  public promotionValue!: number;
  public promotionDetails?: string;
  public promotionStart!: Date;
  public promotionEnd!: Date;
}

Promotion.init(
  {
    promotionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    promotionSeller: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'seller',
        key: 'seller_id',
      },
    },
    promotionProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'product_id',
      },
    },
    promotionValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    promotionDetails: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    promotionStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    promotionEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Promotion',
    tableName: 'promotions',
    timestamps: false,
  }
);
