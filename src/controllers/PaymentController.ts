import { Request, Response } from 'express';
import { paymentService } from '../services/PaymentService';

export class PaymentController {
  async getAll(req: Request, res: Response) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      const result = await paymentService.findAll(limit, offset);
      res.json({ success: true, data: result.rows, total: result.count });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { paymentId } = req.params;
      const payment = await paymentService.findById(parseInt(paymentId));
      if (!payment) {
        return res.status(404).json({ success: false, message: 'Payment not found' });
      }
      res.json({ success: true, data: payment });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getByOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const payment = await paymentService.findByOrder(parseInt(orderId));
      if (!payment) {
        return res.status(404).json({ success: false, message: 'Payment not found' });
      }
      res.json({ success: true, data: payment });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { paymentOrder, paymentAmount, paymentMethod, paymentTransaction } = req.body;

      if ([paymentOrder, paymentAmount, paymentMethod, paymentTransaction].includes(undefined)) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const payment = await paymentService.create(req.body);
      res.status(201).json({ success: true, data: payment, message: 'Payment created successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { paymentId } = req.params;
      const payment = await paymentService.update(parseInt(paymentId), req.body);
      res.json({ success: true, data: payment, message: 'Payment updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { paymentId } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ success: false, message: 'Status required' });
      }

      const payment = await paymentService.updateStatus(parseInt(paymentId), status);
      res.json({ success: true, data: payment, message: 'Payment status updated' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { paymentId } = req.params;
      await paymentService.delete(parseInt(paymentId));
      res.json({ success: true, message: 'Payment deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      const stats = await paymentService.getPaymentStats();
      res.json({ success: true, data: stats });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }
}

export const paymentController = new PaymentController();
