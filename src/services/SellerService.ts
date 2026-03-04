import { Seller } from '../models/Seller';
import * as bcrypt from 'bcrypt';

export class SellerService {
  async findAll(limit?: number, offset?: number) {
    return await Seller.findAndCountAll({
      limit: limit || 10,
      offset: offset || 0,
      order: [['sellerId', 'DESC']],
    });
  }

  async findById(sellerId: number) {
    return await Seller.findByPk(sellerId);
  }

  async findByEmail(email: string) {
    return await Seller.findOne({ where: { sellerEmail: email } });
  }

  async findByPhone(phone: string) {
    return await Seller.findOne({ where: { sellerPhone: phone } });
  }

  async create(sellerData: any) {
    const hashedPassword = await bcrypt.hash(sellerData.sellerPassword, 10);
    return await Seller.create({
      ...sellerData,
      sellerPassword: hashedPassword,
    });
  }

  async update(sellerId: number, sellerData: any) {
    const seller = await Seller.findByPk(sellerId);
    if (!seller) throw new Error('Seller not found');
    
    if (sellerData.sellerPassword) {
      sellerData.sellerPassword = await bcrypt.hash(sellerData.sellerPassword, 10);
    }
    
    return await seller.update(sellerData);
  }

  async delete(sellerId: number) {
    const seller = await Seller.findByPk(sellerId);
    if (!seller) throw new Error('Seller not found');
    return await seller.destroy();
  }

  async searchByName(name: string) {
    return await Seller.findAll({
      where: {
        sellerName: { [require('sequelize').Op.like]: `%${name}%` },
      },
    });
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export const sellerService = new SellerService();
