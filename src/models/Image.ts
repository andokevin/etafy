import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface ImageAttributes {
  imageId: number;
  imagePath: string;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, 'imageId'> {}

export class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
  public imageId!: number;
  public imagePath!: string;
}

Image.init(
  {
    imageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imagePath: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Image',
    tableName: 'image',
    timestamps: false,
  }
);
