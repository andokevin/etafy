import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface BrandAttributes {
  brandId: number;
  brandName: string;
  brandStatus: number;
}

interface BrandCreationAttributes extends Optional<BrandAttributes, 'brandId'> {}

export class Brand extends Model<BrandAttributes, BrandCreationAttributes> implements BrandAttributes {
  public brandId!: number;
  public brandName!: string;
  public brandStatus!: number;
}

Brand.init(
  {
    brandId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brandName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    brandStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Brand',
    tableName: 'brand',
    timestamps: false,
  }
);
