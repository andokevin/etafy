import { Router } from 'express';
import { userController } from '../controllers/UserController';
import { sellerController } from '../controllers/SellerController';
import { productController } from '../controllers/ProductController';
import { orderController } from '../controllers/OrderController';
import { cartController } from '../controllers/CartController';
import { categoryController } from '../controllers/CategoryController';
import { paymentController } from '../controllers/PaymentController';
import { favoriteController } from '../controllers/FavoriteController';

const router = Router();

// ==================== USER ROUTES ====================
router.get('/users', (req, res) => userController.getAll(req, res));
router.get('/users/search', (req, res) => userController.search(req, res));
router.get('/users/:userId', (req, res) => userController.getById(req, res));
router.post('/users', (req, res) => userController.create(req, res));
router.put('/users/:userId', (req, res) => userController.update(req, res));
router.delete('/users/:userId', (req, res) => userController.delete(req, res));

// ==================== SELLER ROUTES ====================
router.get('/sellers', (req, res) => sellerController.getAll(req, res));
router.get('/sellers/search', (req, res) => sellerController.search(req, res));
router.get('/sellers/:sellerId', (req, res) => sellerController.getById(req, res));
router.post('/sellers', (req, res) => sellerController.create(req, res));
router.put('/sellers/:sellerId', (req, res) => sellerController.update(req, res));
router.delete('/sellers/:sellerId', (req, res) => sellerController.delete(req, res));

// ==================== PRODUCT ROUTES ====================
router.get('/products', (req, res) => productController.getAll(req, res));
router.get('/products/search', (req, res) => productController.search(req, res));
router.get('/products/category/:categoryId', (req, res) => productController.getByCategory(req, res));
router.get('/products/brand/:brandId', (req, res) => productController.getByBrand(req, res));
router.get('/products/seller/:sellerId', (req, res) => productController.getBySeller(req, res));
router.get('/products/:productId', (req, res) => productController.getById(req, res));
router.post('/products', (req, res) => productController.create(req, res));
router.put('/products/:productId', (req, res) => productController.update(req, res));
router.delete('/products/:productId', (req, res) => productController.delete(req, res));
router.post('/products/:productId/like', (req, res) => productController.like(req, res));
router.post('/products/:productId/unlike', (req, res) => productController.unlike(req, res));

// ==================== ORDER ROUTES ====================
router.get('/orders', (req, res) => orderController.getAll(req, res));
router.get('/orders/stats', (req, res) => orderController.getStats(req, res));
router.get('/orders/buyer/:buyerId', (req, res) => orderController.getByBuyer(req, res));
router.get('/orders/seller/:sellerId', (req, res) => orderController.getBySeller(req, res));
router.get('/orders/:orderId', (req, res) => orderController.getById(req, res));
router.post('/orders', (req, res) => orderController.create(req, res));
router.put('/orders/:orderId', (req, res) => orderController.update(req, res));
router.patch('/orders/:orderId/status', (req, res) => orderController.updateStatus(req, res));
router.patch('/orders/:orderId/payment-status', (req, res) => orderController.updatePaymentStatus(req, res));
router.delete('/orders/:orderId', (req, res) => orderController.delete(req, res));

// ==================== CART ROUTES ====================
router.get('/carts/buyer/:buyerId', (req, res) => cartController.getByBuyer(req, res));
router.get('/carts/:cartId', (req, res) => cartController.getById(req, res));
router.get('/carts/:cartId/total', (req, res) => cartController.getTotal(req, res));
router.post('/carts', (req, res) => cartController.create(req, res));
router.post('/carts/:cartId/items', (req, res) => cartController.addItem(req, res));
router.put('/carts/:cartId/items/:productId', (req, res) => cartController.updateItemQuantity(req, res));
router.delete('/carts/:cartId/items/:productId', (req, res) => cartController.removeItem(req, res));
router.delete('/carts/:cartId/clear', (req, res) => cartController.clearCart(req, res));
router.delete('/carts/:cartId', (req, res) => cartController.delete(req, res));

// ==================== CATEGORY ROUTES ====================
router.get('/categories', (req, res) => categoryController.getAll(req, res));
router.get('/categories/active', (req, res) => categoryController.getActive(req, res));
router.get('/categories/:categoryId', (req, res) => categoryController.getById(req, res));
router.post('/categories', (req, res) => categoryController.create(req, res));
router.put('/categories/:categoryId', (req, res) => categoryController.update(req, res));
router.delete('/categories/:categoryId', (req, res) => categoryController.delete(req, res));

// ==================== PAYMENT ROUTES ====================
router.get('/payments', (req, res) => paymentController.getAll(req, res));
router.get('/payments/stats', (req, res) => paymentController.getStats(req, res));
router.get('/payments/:paymentId', (req, res) => paymentController.getById(req, res));
router.get('/payments/order/:orderId', (req, res) => paymentController.getByOrder(req, res));
router.post('/payments', (req, res) => paymentController.create(req, res));
router.put('/payments/:paymentId', (req, res) => paymentController.update(req, res));
router.patch('/payments/:paymentId/status', (req, res) => paymentController.updateStatus(req, res));
router.delete('/payments/:paymentId', (req, res) => paymentController.delete(req, res));

// ==================== FAVORITE ROUTES ====================
router.get('/favorites/buyer/:buyerId', (req, res) => favoriteController.getByBuyer(req, res));
router.get('/favorites/:buyerId/:productId', (req, res) => favoriteController.isFavorite(req, res));
router.get('/favorites/count/:buyerId', (req, res) => favoriteController.getFavoritesCount(req, res));
router.post('/favorites/:buyerId/:productId', (req, res) => favoriteController.addFavorite(req, res));
router.delete('/favorites/:buyerId/:productId', (req, res) => favoriteController.removeFavorite(req, res));

// Health check
router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

export default router;
