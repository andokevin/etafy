import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface CategoryAttributes {
  categoryId: number;
  categoryName: string;
  categoryStatus: number;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'categoryId'> {}

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public categoryId!: number;
  public categoryName!: string;
  public categoryStatus!: number;
}

Category.init(
  {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    categoryStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    timestamps: false,
  }
);
