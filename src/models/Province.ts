import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface ProvinceAttributes {
  provinceId: number;
  provinceName?: string;
}

interface ProvinceCreationAttributes extends Optional<ProvinceAttributes, 'provinceId'> {}

export class Province extends Model<ProvinceAttributes, ProvinceCreationAttributes> implements ProvinceAttributes {
  public provinceId!: number;
  public provinceName?: string;
}

Province.init(
  {
    provinceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    provinceName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Province',
    tableName: 'province',
    timestamps: false,
  }
);
