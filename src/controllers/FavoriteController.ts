import { Request, Response } from 'express';
import { favoriteService } from '../services/FavoriteService';

export class FavoriteController {
  async getByBuyer(req: Request, res: Response) {
    try {
      const { buyerId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      const result = await favoriteService.findByBuyer(parseInt(buyerId), limit, offset);
      res.json({ success: true, data: result.rows, total: result.count });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async isFavorite(req: Request, res: Response) {
    try {
      const { buyerId, productId } = req.params;
      const isFav = await favoriteService.isFavorite(parseInt(buyerId), parseInt(productId));
      res.json({ success: true, data: { isFavorite: isFav } });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async addFavorite(req: Request, res: Response) {
    try {
      const { buyerId, productId } = req.params;
      const favorite = await favoriteService.addFavorite(parseInt(buyerId), parseInt(productId));
      res.status(201).json({ success: true, data: favorite, message: 'Product added to favorites' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async removeFavorite(req: Request, res: Response) {
    try {
      const { buyerId, productId } = req.params;
      await favoriteService.removeFavorite(parseInt(buyerId), parseInt(productId));
      res.json({ success: true, message: 'Product removed from favorites' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getFavoritesCount(req: Request, res: Response) {
    try {
      const { buyerId } = req.params;
      const count = await favoriteService.getFavoritesCount(parseInt(buyerId));
      res.json({ success: true, data: { count } });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }
}

export const favoriteController = new FavoriteController();
