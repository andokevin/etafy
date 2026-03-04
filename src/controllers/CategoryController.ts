import { Request, Response } from 'express';
import { categoryService } from '../services/CategoryService';

export class CategoryController {
  async getAll(req: Request, res: Response) {
    try {
      const categories = await categoryService.findAll();
      res.json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getActive(req: Request, res: Response) {
    try {
      const categories = await categoryService.getActive();
      res.json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const category = await categoryService.findById(parseInt(categoryId));
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      res.json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { categoryName, categoryStatus } = req.body;
      if (!categoryName || categoryStatus === undefined) {
        return res.status(400).json({ success: false, message: 'Name and status required' });
      }

      const category = await categoryService.create(req.body);
      res.status(201).json({ success: true, data: category, message: 'Category created successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const category = await categoryService.update(parseInt(categoryId), req.body);
      res.json({ success: true, data: category, message: 'Category updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      await categoryService.delete(parseInt(categoryId));
      res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }
}

export const categoryController = new CategoryController();
