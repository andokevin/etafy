import { Request, Response } from 'express';
import { sellerService } from '../services/SellerService';

export class SellerController {
  async getAll(req: Request, res: Response) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      const result = await sellerService.findAll(limit, offset);
      res.json({ success: true, data: result.rows, total: result.count });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { sellerId } = req.params;
      const seller = await sellerService.findById(parseInt(sellerId));
      if (!seller) {
        return res.status(404).json({ success: false, message: 'Seller not found' });
      }
      res.json({ success: true, data: seller });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { sellerName, sellerEmail, sellerPassword, sellerAddress, sellerPhone, sellerProfile } = req.body;

      if ([sellerName, sellerEmail, sellerPassword, sellerAddress, sellerPhone, sellerProfile].includes(undefined)) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const existingEmail = await sellerService.findByEmail(sellerEmail);
      if (existingEmail) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }

      const existingPhone = await sellerService.findByPhone(sellerPhone);
      if (existingPhone) {
        return res.status(400).json({ success: false, message: 'Phone already exists' });
      }

      const seller = await sellerService.create(req.body);
      res.status(201).json({ success: true, data: seller, message: 'Seller created successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { sellerId } = req.params;
      const seller = await sellerService.update(parseInt(sellerId), req.body);
      res.json({ success: true, data: seller, message: 'Seller updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { sellerId } = req.params;
      await sellerService.delete(parseInt(sellerId));
      res.json({ success: true, message: 'Seller deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { name } = req.query;
      if (!name) {
        return res.status(400).json({ success: false, message: 'Search term required' });
      }
      const sellers = await sellerService.searchByName(name as string);
      res.json({ success: true, data: sellers });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }
}

export const sellerController = new SellerController();
