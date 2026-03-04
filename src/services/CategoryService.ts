import { Category } from '../models/Category';

export class CategoryService {
  async findAll() {
    return await Category.findAll({
      order: [['categoryId', 'ASC']],
    });
  }

  async findById(categoryId: number) {
    return await Category.findByPk(categoryId);
  }

  async findByName(name: string) {
    return await Category.findOne({
      where: {
        categoryName: { [require('sequelize').Op.like]: `%${name}%` },
      },
    });
  }

  async create(categoryData: any) {
    return await Category.create(categoryData);
  }

  async update(categoryId: number, categoryData: any) {
    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error('Category not found');
    return await category.update(categoryData);
  }

  async delete(categoryId: number) {
    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error('Category not found');
    return await category.destroy();
  }

  async getActive() {
    return await Category.findAll({
      where: { categoryStatus: 1 },
      order: [['categoryName', 'ASC']],
    });
  }
}

export const categoryService = new CategoryService();
