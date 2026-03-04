import { Request, Response } from 'express';
import { userService } from '../services/UserService';

export class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      const result = await userService.findAll(limit, offset);
      res.json({ success: true, data: result.rows, total: result.count });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await userService.findById(parseInt(userId));
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { userName, userPrename, userEmail, userPassword, userAddress, userPhone, userGenre, userProvince, userDistrict } = req.body;
      
      if ([userName, userPrename, userEmail, userPassword, userAddress, userPhone, userGenre, userProvince, userDistrict].includes(undefined)) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const existingEmail = await userService.findByEmail(userEmail);
      if (existingEmail) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }

      const existingPhone = await userService.findByPhone(userPhone);
      if (existingPhone) {
        return res.status(400).json({ success: false, message: 'Phone already exists' });
      }

      const user = await userService.create(req.body);
      res.status(201).json({ success: true, data: user, message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await userService.update(parseInt(userId), req.body);
      res.json({ success: true, data: user, message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      await userService.delete(parseInt(userId));
      res.json({ success: true, message: 'User deleted successfully' });
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
      const users = await userService.searchByName(name as string);
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as any).message });
    }
  }
}

export const userController = new UserController();
