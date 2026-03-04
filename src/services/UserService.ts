import { User } from '../models/User';
import * as bcrypt from 'bcrypt';

export class UserService {
  async findAll(limit?: number, offset?: number) {
    return await User.findAndCountAll({
      limit: limit || 10,
      offset: offset || 0,
      order: [['userId', 'DESC']],
    });
  }

  async findById(userId: number) {
    return await User.findByPk(userId);
  }

  async findByEmail(email: string) {
    return await User.findOne({ where: { userEmail: email } });
  }

  async findByPhone(phone: string) {
    return await User.findOne({ where: { userPhone: phone } });
  }

  async create(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.userPassword, 10);
    return await User.create({
      ...userData,
      userPassword: hashedPassword,
    });
  }

  async update(userId: number, userData: any) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    
    if (userData.userPassword) {
      userData.userPassword = await bcrypt.hash(userData.userPassword, 10);
    }
    
    return await user.update(userData);
  }

  async delete(userId: number) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    return await user.destroy();
  }

  async searchByName(name: string) {
    return await User.findAll({
      where: {
        [require('sequelize').Op.or]: [
          { userName: { [require('sequelize').Op.like]: `%${name}%` } },
          { userPrename: { [require('sequelize').Op.like]: `%${name}%` } },
        ],
      },
    });
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export const userService = new UserService();
