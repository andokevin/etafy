// Import all models
export { User } from './User';
export { Seller } from './Seller';
export { Product } from './Product';
export { Category } from './Category';
export { Brand } from './Brand';
export { Color } from './Color';
export { Order } from './Order';
export { Cart } from './Cart';
export { CartItem } from './CartItem';
export { Payment } from './Payment';
export { Notification } from './Notification';
export { Favorite } from './Favorite';
export { Image } from './Image';
export { Province } from './Province';
export { Worker } from './Worker';
export { Admin } from './Admin';
export { Promotion } from './Promotion';
export { Deposit } from './Deposit';
export { Agent } from './Agent';
export { Delivery } from './Delivery';
export { OrderItem } from './OrderItem';

// Import models
import { User } from './User';
import { Seller } from './Seller';
import { Product } from './Product';
import { Category } from './Category';
import { Brand } from './Brand';
import { Order } from './Order';
import { Cart } from './Cart';
import { CartItem } from './CartItem';
import { Payment } from './Payment';
import { Notification } from './Notification';
import { Favorite } from './Favorite';
import { Province } from './Province';
import { Worker } from './Worker';
import { Admin } from './Admin';
import { Promotion } from './Promotion';
import { Deposit } from './Deposit';
import { Agent } from './Agent';
import { Delivery } from './Delivery';
import { OrderItem } from './OrderItem';

// User associations
User.hasMany(Cart, { foreignKey: 'cart_buyer', as: 'carts' });
User.hasMany(Order, { foreignKey: 'order_buyer', as: 'buyerOrders' });
User.hasMany(Favorite, { foreignKey: 'favorite_buyer', as: 'favorites' });
User.hasMany(Notification, { foreignKey: 'notification_user', as: 'notifications' });

// Seller associations
Seller.hasMany(Product, { foreignKey: 'product_seller', as: 'products' });
Seller.hasMany(Order, { foreignKey: 'order_seller', as: 'sellerOrders' });
Seller.hasMany(Promotion, { foreignKey: 'promotion_seller', as: 'promotions' });

// Product associations
Product.belongsTo(Seller, { foreignKey: 'product_seller', as: 'seller' });
Product.belongsTo(Brand, { foreignKey: 'product_brand', as: 'brand' });
Product.belongsTo(Category, { foreignKey: 'product_category', as: 'category' });
Product.hasMany(CartItem, { foreignKey: 'product_id', as: 'cartItems' });
Product.hasMany(Favorite, { foreignKey: 'favorite_product', as: 'favoredBy' });
Product.hasMany(Order, { foreignKey: 'order_product', as: 'orders' });

// Order associations
Order.belongsTo(User, { foreignKey: 'order_buyer', as: 'buyer' });
Order.belongsTo(Seller, { foreignKey: 'order_seller', as: 'seller' });
Order.belongsTo(Product, { foreignKey: 'order_product', as: 'product' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
Order.hasOne(Payment, { foreignKey: 'payment_order', as: 'payment' });

// Cart associations
Cart.belongsTo(User, { foreignKey: 'cart_buyer', as: 'buyer' });
Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items' });

// CartItem associations
CartItem.belongsTo(Cart, { foreignKey: 'cart_id', as: 'cart' });
CartItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Payment associations
Payment.belongsTo(Order, { foreignKey: 'payment_order', as: 'order' });

// Brand associations
Brand.hasMany(Product, { foreignKey: 'product_brand', as: 'products' });

// Category associations
Category.hasMany(Product, { foreignKey: 'product_category', as: 'products' });

// Favorite associations
Favorite.belongsTo(User, { foreignKey: 'favorite_buyer', as: 'buyer' });
Favorite.belongsTo(Product, { foreignKey: 'favorite_product', as: 'product' });

// Worker associations
Worker.hasMany(Admin, { foreignKey: 'admin_worker', as: 'adminRoles' });
Worker.hasMany(Agent, { foreignKey: 'agent_worker', as: 'agentRoles' });
Worker.hasMany(Delivery, { foreignKey: 'delivery_worker', as: 'deliveries' });

// Admin associations
Admin.belongsTo(Worker, { foreignKey: 'admin_worker', as: 'worker' });
Admin.belongsTo(Deposit, { foreignKey: 'admin_deposit', as: 'deposit' });

// Agent associations
Agent.belongsTo(Worker, { foreignKey: 'agent_worker', as: 'worker' });

// Delivery associations
Delivery.belongsTo(Worker, { foreignKey: 'delivery_worker', as: 'worker' });

// Province associations
Province.hasMany(Deposit, { foreignKey: 'deposit_province', as: 'deposits' });

// Deposit associations
Deposit.belongsTo(Province, { foreignKey: 'deposit_province', as: 'province' });
Deposit.hasMany(Admin, { foreignKey: 'admin_deposit', as: 'admins' });

// Promotion associations
Promotion.belongsTo(Seller, { foreignKey: 'promotion_seller', as: 'seller' });
Promotion.belongsTo(Product, { foreignKey: 'promotion_product', as: 'product' });

// OrderItem associations
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Notification associations
Notification.belongsTo(User, { foreignKey: 'notification_user', as: 'user' });
