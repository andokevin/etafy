import { Request, Response } from 'express';
import { productService } from '../services/ProductService';

export class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      const result = await productService.findAll(limit, offset);
      res.json({ success: true, data: result.rows, total: result.count });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await productService.findById(parseInt(productId));
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      const result = await productService.findByCategory(parseInt(categoryId), limit, offset);
      res.json({ success: true, data: result.rows, total: result.count });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getByBrand(req: Request, res: Response) {
    try {
      const { brandId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      const result = await productService.findByBrand(parseInt(brandId), limit, offset);
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
      const result = await productService.findBySeller(parseInt(sellerId), limit, offset);
      res.json({ success: true, data: result.rows, total: result.count });
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
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      const result = await productService.searchByName(name as string, limit, offset);
      res.json({ success: true, data: result.rows, total: result.count });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { productName, productDescription, productPrice, productSeller, productBrand, productCategory, productGenre, productStatus, productSize, productFabric, productColor } = req.body;

      if ([productName, productDescription, productPrice, productSeller, productBrand, productCategory, productGenre, productStatus, productSize, productFabric, productColor].includes(undefined)) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const product = await productService.create(req.body);
      res.status(201).json({ success: true, data: product, message: 'Product created successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await productService.update(parseInt(productId), req.body);
      res.json({ success: true, data: product, message: 'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      await productService.delete(parseInt(productId));
      res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async like(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      await productService.incrementLikeCount(parseInt(productId));
      res.json({ success: true, message: 'Product liked' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async unlike(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      await productService.decrementLikeCount(parseInt(productId));
      res.json({ success: true, message: 'Product unliked' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }
}

export const productController = new ProductController();
