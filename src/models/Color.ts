import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface ColorAttributes {
  colorId: number;
  colorName: string;
  colorCode: string;
}

interface ColorCreationAttributes extends Optional<ColorAttributes, 'colorId'> {}

export class Color extends Model<ColorAttributes, ColorCreationAttributes> implements ColorAttributes {
  public colorId!: number;
  public colorName!: string;
  public colorCode!: string;
}

Color.init(
  {
    colorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    colorName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    colorCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Color',
    tableName: 'color',
    timestamps: false,
  }
);
