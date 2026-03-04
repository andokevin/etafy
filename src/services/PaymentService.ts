import { Payment } from '../models/Payment';
import { Order } from '../models/Order';

export class PaymentService {
  async findAll(limit?: number, offset?: number) {
    return await Payment.findAndCountAll({
      limit: limit || 10,
      offset: offset || 0,
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['orderId', 'orderAmount', 'orderBuyer'],
        },
      ],
      order: [['paymentId', 'DESC']],
    });
  }

  async findById(paymentId: number) {
    return await Payment.findByPk(paymentId, {
      include: [{ model: Order, as: 'order' }],
    });
  }

  async findByOrder(orderId: number) {
    return await Payment.findOne({
      where: { paymentOrder: orderId },
      include: [{ model: Order, as: 'order' }],
    });
  }

  async create(paymentData: any) {
    return await Payment.create(paymentData);
  }

  async update(paymentId: number, paymentData: any) {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) throw new Error('Payment not found');
    return await payment.update(paymentData);
  }

  async updateStatus(paymentId: number, status: string) {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) throw new Error('Payment not found');
    return await payment.update({ paymentStatus: status });
  }

  async delete(paymentId: number) {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) throw new Error('Payment not found');
    return await payment.destroy();
  }

  async getPaymentStats() {
    return {
      total: await Payment.count(),
      completed: await Payment.count({ where: { paymentStatus: 'completed' } }),
      pending: await Payment.count({ where: { paymentStatus: 'pending' } }),
      failed: await Payment.count({ where: { paymentStatus: 'failed' } }),
    };
  }
}

export const paymentService = new PaymentService();
