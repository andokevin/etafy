import { Favorite } from '../models/Favorite';
import { Product } from '../models/Product';
import { User } from '../models/User';

export class FavoriteService {
  async findByBuyer(buyerId: number, limit?: number, offset?: number) {
    return await Favorite.findAndCountAll({
      where: { favoriteBuyer: buyerId },
      limit: limit || 10,
      offset: offset || 0,
      include: [
        { model: Product, as: 'product', attributes: ['productId', 'productName', 'productPrice', 'productDescription'] },
      ],
      order: [['favoriteBuyer', 'DESC']],
    });
  }

  async isFavorite(buyerId: number, productId: number) {
    const favorite = await Favorite.findOne({
      where: { favoriteBuyer: buyerId, favoriteProduct: productId },
    });
    return !!favorite;
  }

  async addFavorite(buyerId: number, productId: number) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');

    const existing = await Favorite.findOne({
      where: { favoriteBuyer: buyerId, favoriteProduct: productId },
    });

    if (existing) throw new Error('Product already in favorites');

    return await Favorite.create({
      favoriteBuyer: buyerId,
      favoriteProduct: productId,
    });
  }

  async removeFavorite(buyerId: number, productId: number) {
    return await Favorite.destroy({
      where: { favoriteBuyer: buyerId, favoriteProduct: productId },
    });
  }

  async getFavoritesCount(buyerId: number) {
    return await Favorite.count({
      where: { favoriteBuyer: buyerId },
    });
  }
}

export const favoriteService = new FavoriteService();
