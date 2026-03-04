import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface FavoriteAttributes {
  favoriteBuyer: number;
  favoriteProduct: number;
}

export class Favorite extends Model<FavoriteAttributes> implements FavoriteAttributes {
  public favoriteBuyer!: number;
  public favoriteProduct!: number;
}

Favorite.init(
  {
    favoriteBuyer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    favoriteProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'product_id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorite',
    timestamps: false,
  }
);
