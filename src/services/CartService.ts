import { Cart } from '../models/Cart';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';
import { User } from '../models/User';

export class CartService {
  async findByBuyer(buyerId: number) {
    return await Cart.findOne({
      where: { cartBuyer: buyerId },
      include: [
        {
          model: CartItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });
  }

  async findById(cartId: number) {
    return await Cart.findByPk(cartId, {
      include: [
        {
          model: CartItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });
  }

  async create(buyerId: number) {
    return await Cart.create({ cartBuyer: buyerId });
  }

  async addItem(cartId: number, productId: number, quantity: number) {
    const cart = await Cart.findByPk(cartId);
    if (!cart) throw new Error('Cart not found');

    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');

    const existingItem = await CartItem.findOne({
      where: { cartId, productId },
    });

    if (existingItem) {
      return await existingItem.update({
        quantity: existingItem.quantity + quantity,
      });
    }

    return await CartItem.create({
      cartId,
      productId,
      quantity,
    });
  }

  async removeItem(cartId: number, productId: number) {
    return await CartItem.destroy({
      where: { cartId, productId },
    });
  }

  async updateItemQuantity(cartId: number, productId: number, quantity: number) {
    const item = await CartItem.findOne({
      where: { cartId, productId },
    });
    if (!item) throw new Error('Cart item not found');
    return await item.update({ quantity });
  }

  async clearCart(cartId: number) {
    return await CartItem.destroy({
      where: { cartId },
    });
  }

  async getCartTotal(cartId: number) {
    const items = await CartItem.findAll({
      where: { cartId },
      include: [{ model: Product, as: 'product', attributes: ['productPrice'] }],
    });

    let total = 0;
    for (const item of items) {
      total += (item.dataValues as any).product.productPrice * item.quantity;
    }
    return total;
  }

  async delete(cartId: number) {
    const cart = await Cart.findByPk(cartId);
    if (!cart) throw new Error('Cart not found');
    return await cart.destroy();
  }
}

export const cartService = new CartService();
