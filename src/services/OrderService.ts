import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { User } from '../models/User';
import { Seller } from '../models/Seller';
import { Product } from '../models/Product';
import { Payment } from '../models/Payment';

export class OrderService {
  async findAll(limit?: number, offset?: number) {
    return await Order.findAndCountAll({
      limit: limit || 10,
      offset: offset || 0,
      include: [
        { model: User, as: 'buyer', attributes: ['userId', 'userName', 'userEmail'] },
        { model: Seller, as: 'seller', attributes: ['sellerId', 'sellerName'] },
        { model: Product, as: 'product', attributes: ['productId', 'productName', 'productPrice'] },
        { model: OrderItem, as: 'items' },
        { model: Payment, as: 'payment' },
      ],
      order: [['orderId', 'DESC']],
    });
  }

  async findById(orderId: number) {
    return await Order.findByPk(orderId, {
      include: [
        { model: User, as: 'buyer' },
        { model: Seller, as: 'seller' },
        { model: Product, as: 'product' },
        { model: OrderItem, as: 'items' },
        { model: Payment, as: 'payment' },
      ],
    });
  }

  async findByBuyer(buyerId: number, limit?: number, offset?: number) {
    return await Order.findAndCountAll({
      where: { orderBuyer: buyerId },
      limit: limit || 10,
      offset: offset || 0,
      include: [
        { model: Seller, as: 'seller', attributes: ['sellerId', 'sellerName'] },
        { model: Product, as: 'product', attributes: ['productId', 'productName'] },
        { model: OrderItem, as: 'items' },
      ],
      order: [['orderId', 'DESC']],
    });
  }

  async findBySeller(sellerId: number, limit?: number, offset?: number) {
    return await Order.findAndCountAll({
      where: { orderSeller: sellerId },
      limit: limit || 10,
      offset: offset || 0,
      include: [
        { model: User, as: 'buyer', attributes: ['userId', 'userName', 'userEmail'] },
        { model: Product, as: 'product', attributes: ['productId', 'productName'] },
        { model: OrderItem, as: 'items' },
      ],
      order: [['orderId', 'DESC']],
    });
  }

  async create(orderData: any) {
    return await Order.create(orderData);
  }

  async createWithItems(orderData: any, items: any[]) {
    const order = await Order.create(orderData);
    
    for (const item of items) {
      await OrderItem.create({
        orderId: order.orderId,
        ...item,
      });
    }
    
    return await this.findById(order.orderId);
  }

  async update(orderId: number, orderData: any) {
    const order = await Order.findByPk(orderId);
    if (!order) throw new Error('Order not found');
    return await order.update(orderData);
  }

  async updateStatus(orderId: number, status: string) {
    const order = await Order.findByPk(orderId);
    if (!order) throw new Error('Order not found');
    return await order.update({ orderStatus: status });
  }

  async updatePaymentStatus(orderId: number, paymentStatus: string) {
    const order = await Order.findByPk(orderId);
    if (!order) throw new Error('Order not found');
    return await order.update({ orderPaymentStatus: paymentStatus });
  }

  async delete(orderId: number) {
    const order = await Order.findByPk(orderId);
    if (!order) throw new Error('Order not found');
    return await order.destroy();
  }

  async getOrderStats(sellerId?: number) {
    const whereClause = sellerId ? { orderSeller: sellerId } : {};
    
    return {
      total: await Order.count({ where: whereClause }),
      pending: await Order.count({ where: { ...whereClause, orderStatus: 'pending' } }),
      completed: await Order.count({ where: { ...whereClause, orderStatus: 'completed' } }),
      cancelled: await Order.count({ where: { ...whereClause, orderStatus: 'cancelled' } }),
    };
  }
}

export const orderService = new OrderService();
