import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Brand } from '../models/Brand';
import { Seller } from '../models/Seller';

export class ProductService {
  async findAll(limit?: number, offset?: number) {
    return await Product.findAndCountAll({
      limit: limit || 10,
      offset: offset || 0,
      include: [
        { model: Seller, as: 'seller', attributes: ['sellerId', 'sellerName'] },
        { model: Brand, as: 'brand', attributes: ['brandId', 'brandName'] },
        { model: Category, as: 'category', attributes: ['categoryId', 'categoryName'] },
      ],
      order: [['productId', 'DESC']],
    });
  }

  async findById(productId: number) {
    return await Product.findByPk(productId, {
      include: [
        { model: Seller, as: 'seller' },
        { model: Brand, as: 'brand' },
        { model: Category, as: 'category' },
      ],
    });
  }

  async findByCategory(categoryId: number, limit?: number, offset?: number) {
    return await Product.findAndCountAll({
      where: { productCategory: categoryId },
      limit: limit || 10,
      offset: offset || 0,
      include: [
        { model: Seller, as: 'seller', attributes: ['sellerId', 'sellerName'] },
        { model: Brand, as: 'brand', attributes: ['brandId', 'brandName'] },
      ],
    });
  }

  async findByBrand(brandId: number, limit?: number, offset?: number) {
    return await Product.findAndCountAll({
      where: { productBrand: brandId },
      limit: limit || 10,
      offset: offset || 0,
      include: [
        { model: Seller, as: 'seller', attributes: ['sellerId', 'sellerName'] },
        { model: Category, as: 'category', attributes: ['categoryId', 'categoryName'] },
      ],
    });
  }

  async findBySeller(sellerId: number, limit?: number, offset?: number) {
    return await Product.findAndCountAll({
      where: { productSeller: sellerId },
      limit: limit || 10,
      offset: offset || 0,
      include: [
        { model: Brand, as: 'brand', attributes: ['brandId', 'brandName'] },
        { model: Category, as: 'category', attributes: ['categoryId', 'categoryName'] },
      ],
    });
  }

  async searchByName(name: string, limit?: number, offset?: number) {
    return await Product.findAndCountAll({
      where: {
        productName: { [require('sequelize').Op.like]: `%${name}%` },
      },
      limit: limit || 10,
      offset: offset || 0,
      include: [
        { model: Seller, as: 'seller', attributes: ['sellerId', 'sellerName'] },
        { model: Brand, as: 'brand', attributes: ['brandId', 'brandName'] },
        { model: Category, as: 'category', attributes: ['categoryId', 'categoryName'] },
      ],
    });
  }

  async create(productData: any) {
    return await Product.create(productData);
  }

  async update(productId: number, productData: any) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');
    return await product.update(productData);
  }

  async delete(productId: number) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');
    return await product.destroy();
  }

  async incrementLikeCount(productId: number) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');
    return await product.increment('productLikeCount');
  }

  async decrementLikeCount(productId: number) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');
    return await product.decrement('productLikeCount');
  }
}

export const productService = new ProductService();
