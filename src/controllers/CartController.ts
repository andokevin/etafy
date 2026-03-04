import { Request, Response } from 'express';
import { cartService } from '../services/CartService';

export class CartController {
  async getByBuyer(req: Request, res: Response) {
    try {
      const { buyerId } = req.params;
      const cart = await cartService.findByBuyer(parseInt(buyerId));
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
      res.json({ success: true, data: cart });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { cartId } = req.params;
      const cart = await cartService.findById(parseInt(cartId));
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
      res.json({ success: true, data: cart });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { buyerId } = req.body;
      if (!buyerId) {
        return res.status(400).json({ success: false, message: 'Buyer ID required' });
      }

      const cart = await cartService.create(buyerId);
      res.status(201).json({ success: true, data: cart, message: 'Cart created successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async addItem(req: Request, res: Response) {
    try {
      const { cartId } = req.params;
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res.status(400).json({ success: false, message: 'Product ID and quantity required' });
      }

      const item = await cartService.addItem(parseInt(cartId), productId, quantity);
      res.json({ success: true, data: item, message: 'Item added to cart' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const { cartId, productId } = req.params;
      await cartService.removeItem(parseInt(cartId), parseInt(productId));
      res.json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async updateItemQuantity(req: Request, res: Response) {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;

      if (!quantity) {
        return res.status(400).json({ success: false, message: 'Quantity required' });
      }

      const item = await cartService.updateItemQuantity(parseInt(cartId), parseInt(productId), quantity);
      res.json({ success: true, data: item, message: 'Item quantity updated' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const { cartId } = req.params;
      await cartService.clearCart(parseInt(cartId));
      res.json({ success: true, message: 'Cart cleared' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getTotal(req: Request, res: Response) {
    try {
      const { cartId } = req.params;
      const total = await cartService.getCartTotal(parseInt(cartId));
      res.json({ success: true, data: { total } });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { cartId } = req.params;
      await cartService.delete(parseInt(cartId));
      res.json({ success: true, message: 'Cart deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }
}

export const cartController = new CartController();
