import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'e_tafy',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  timezone: '+00:00',
});

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
    
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database models synchronized');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};
