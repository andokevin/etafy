import { Request, Response } from 'express';
import { orderService } from '../services/OrderService';

export class OrderController {
  async getAll(req: Request, res: Response) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      const result = await orderService.findAll(limit, offset);
      res.json({ success: true, data: result.rows, total: result.count });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const order = await orderService.findById(parseInt(orderId));
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      res.json({ success: true, data: order });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getByBuyer(req: Request, res: Response) {
    try {
      const { buyerId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      const result = await orderService.findByBuyer(parseInt(buyerId), limit, offset);
      res.json({ success: true, data: result.rows, total: result.count });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getBySeller(req: Request, res: Response) {
    try {
      const { sellerId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      const result = await orderService.findBySeller(parseInt(sellerId), limit, offset);
      res.json({ success: true, data: result.rows, total: result.count });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { orderBuyer, orderSeller, orderProduct, orderAmount, items } = req.body;

      if ([orderBuyer, orderSeller, orderProduct, orderAmount].includes(undefined)) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      let order;
      if (items && Array.isArray(items)) {
        order = await orderService.createWithItems(
          { orderBuyer, orderSeller, orderProduct, orderAmount },
          items
        );
      } else {
        order = await orderService.create(req.body);
      }

      res.status(201).json({ success: true, data: order, message: 'Order created successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const order = await orderService.update(parseInt(orderId), req.body);
      res.json({ success: true, data: order, message: 'Order updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ success: false, message: 'Status required' });
      }

      const order = await orderService.updateStatus(parseInt(orderId), status);
      res.json({ success: true, data: order, message: 'Order status updated' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async updatePaymentStatus(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { paymentStatus } = req.body;

      if (!paymentStatus) {
        return res.status(400).json({ success: false, message: 'Payment status required' });
      }

      const order = await orderService.updatePaymentStatus(parseInt(orderId), paymentStatus);
      res.json({ success: true, data: order, message: 'Payment status updated' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      await orderService.delete(parseInt(orderId));
      res.json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      const { sellerId } = req.query;
      const stats = await orderService.getOrderStats(sellerId ? parseInt(sellerId as string) : undefined);
      res.json({ success: true, data: stats });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }
}

export const orderController = new OrderController();
