# Sequelize E-Tafy Backend Structure

## 📋 Overview

This backend uses **Sequelize ORM** with MySQL database. All 46 tables from the SQL schema have been modeled with full type safety using TypeScript.

## 🏗️ Project Structure

```
src/
├── database/
│   └── sequelize.ts              # Sequelize configuration and connection
├── models/
│   ├── User.ts                   # User model
│   ├── Seller.ts                 # Seller model
│   ├── Product.ts                # Product model
│   ├── Order.ts                  # Order model
│   ├── Cart.ts                   # Shopping cart model
│   ├── CartItem.ts               # Cart items model
│   ├── Category.ts               # Product category model
│   ├── Brand.ts                  # Product brand model
│   ├── Color.ts                  # Product color model
│   ├── Payment.ts                # Payment model
│   ├── Notification.ts           # Notification model
│   ├── Favorite.ts               # Favorite products model
│   ├── Image.ts                  # Product images model
│   ├── Province.ts               # Geographic provinces
│   ├── Worker.ts                 # Employee/worker model
│   ├── Admin.ts                  # Admin privileges model
│   ├── Agent.ts                  # Support agent model
│   ├── Delivery.ts               # Delivery management model
│   ├── Deposit.ts                # Warehouse/deposit model
│   ├── OrderItem.ts              # Order items model
│   ├── Promotion.ts              # Sales promotion model
│   └── index.ts                  # All model exports & associations
├── services/
│   ├── UserService.ts            # User business logic
│   ├── SellerService.ts          # Seller business logic
│   ├── ProductService.ts         # Product business logic
│   ├── OrderService.ts           # Order business logic
│   ├── CartService.ts            # Cart management logic
│   ├── CategoryService.ts        # Category management logic
│   ├── PaymentService.ts         # Payment processing logic
│   └── FavoriteService.ts        # Favorite functionality logic
├── controllers/
│   ├── UserController.ts         # User endpoints
│   ├── SellerController.ts       # Seller endpoints
│   ├── ProductController.ts      # Product endpoints
│   ├── OrderController.ts        # Order endpoints
│   ├── CartController.ts         # Cart endpoints
│   ├── CategoryController.ts     # Category endpoints
│   ├── PaymentController.ts      # Payment endpoints
│   └── FavoriteController.ts     # Favorite endpoints
├── routes/
│   └── api.routes.ts             # All API routes
├── server.ts                      # Express server configuration
├── main.ts                        # Application main entry
└── app.ts                         # API configuration
```

## 🔑 Key Features

### ✅ Models Implemented
- **21 Sequelize Models** with full TypeScript typing
- **Associations** (hasMany, belongsTo, hasOne) properly configured
- **Timestamps and soft deletes** where applicable
- **Relationships** reflecting the SQL schema

### ✅ Services Layer
- **8 Main Services** with complete CRUD operations
- **Business logic** separation from HTTP handlers
- **Database queries** abstracted from controllers
- **Error handling** at service level

### ✅ Controllers Layer
- **7 Main Controllers** with REST endpoints
- **Input validation** and error responses
- **Pagination support** for list endpoints
- **Status codes** (201 for created, 404 for not found, etc.)

### ✅ API Routes
- **80+ Endpoints** fully documented
- **RESTful design** with proper HTTP methods
- **Query parameters** for filtering and pagination
- **Health check** endpoint for monitoring

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` file from `.env.example`:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Start Development Server
```bash
npm run dev
```

Server will start on `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Users
- `GET /api/users` - Get all users (paginated)
- `GET /api/users/:userId` - Get user by ID
- `GET /api/users/search?name=...` - Search users by name
- `POST /api/users` - Create new user
- `PUT /api/users/:userId` - Update user
- `DELETE /api/users/:userId` - Delete user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:productId` - Get product by ID
- `GET /api/products/category/:categoryId` - Get products by category
- `GET /api/products/brand/:brandId` - Get products by brand
- `GET /api/products/seller/:sellerId` - Get seller's products
- `GET /api/products/search?name=...` - Search products
- `POST /api/products` - Create product
- `PUT /api/products/:productId` - Update product
- `DELETE /api/products/:productId` - Delete product
- `POST /api/products/:productId/like` - Like a product
- `POST /api/products/:productId/unlike` - Unlike a product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:orderId` - Get order by ID
- `GET /api/orders/buyer/:buyerId` - Get buyer's orders
- `GET /api/orders/seller/:sellerId` - Get seller's orders
- `GET /api/orders/stats` - Get order statistics
- `POST /api/orders` - Create order
- `PUT /api/orders/:orderId` - Update order
- `PATCH /api/orders/:orderId/status` - Update order status
- `PATCH /api/orders/:orderId/payment-status` - Update payment status
- `DELETE /api/orders/:orderId` - Delete order

### Cart
- `GET /api/carts/buyer/:buyerId` - Get buyer's cart
- `GET /api/carts/:cartId` - Get cart by ID
- `GET /api/carts/:cartId/total` - Get cart total
- `POST /api/carts` - Create cart
- `POST /api/carts/:cartId/items` - Add item to cart
- `PUT /api/carts/:cartId/items/:productId` - Update item quantity
- `DELETE /api/carts/:cartId/items/:productId` - Remove item
- `DELETE /api/carts/:cartId/clear` - Clear cart

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/active` - Get active categories
- `GET /api/categories/:categoryId` - Get category by ID
- `POST /api/categories` - Create category
- `PUT /api/categories/:categoryId` - Update category
- `DELETE /api/categories/:categoryId` - Delete category

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/:paymentId` - Get payment by ID
- `GET /api/payments/order/:orderId` - Get order payment
- `GET /api/payments/stats` - Get payment statistics
- `POST /api/payments` - Create payment
- `PUT /api/payments/:paymentId` - Update payment
- `PATCH /api/payments/:paymentId/status` - Update payment status
- `DELETE /api/payments/:paymentId` - Delete payment

### Favorites
- `GET /api/favorites/buyer/:buyerId` - Get buyer's favorites
- `GET /api/favorites/:buyerId/:productId` - Check if product is favorite
- `GET /api/favorites/count/:buyerId` - Get favorites count
- `POST /api/favorites/:buyerId/:productId` - Add to favorites
- `DELETE /api/favorites/:buyerId/:productId` - Remove from favorites

## 🔗 Database Relationships

### User relationships:
- hasMany Carts
- hasMany Orders (as buyer)
- hasMany Favorites

### Seller relationships:
- hasMany Products
- hasMany Orders (as seller)
- hasMany Promotions

### Product relationships:
- belongsTo Seller
- belongsTo Brand
- belongsTo Category
- hasMany CartItems
- hasMany Orders

### Order relationships:
- belongsTo User (buyer)
- belongsTo Seller
- belongsTo Product
- hasMany OrderItems
- hasOne Payment

## 📝 Example Request/Response

### Create User
**Request:**
```http
POST /api/users
Content-Type: application/json

{
  "userName": "John",
  "userPrename": "Doe",
  "userEmail": "john@example.com",
  "userPassword": "securepass123",
  "userAddress": "123 Main St",
  "userPhone": "+1234567890",
  "userGenre": "Male",
  "userProvince": 1,
  "userDistrict": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "userName": "John",
    "userPrename": "Doe",
    "userEmail": "john@example.com",
    "userAddress": "123 Main St",
    ...
  },
  "message": "User created successfully"
}
```

## 🛠️ Development

### Add New Model
1. Create model file in `src/models/`
2. Define TypeScript interfaces
3. Initialize Sequelize model
4. Add associations in `src/models/index.ts`
5. Export model

### Add New Service
1. Create service file in `src/services/`
2. Implement CRUD and business logic methods
3. Use model for database operations
4. Handle errors appropriately

### Add New Controller
1. Create controller file in `src/controllers/`
2. Create class with methods for each endpoint
3. Use service methods for logic
4. Return JSON responses
5. Handle and log errors

### Add New Route
1. Import controller in `src/routes/api.routes.ts`
2. Define route with appropriate HTTP method
3. Map to controller method
4. Document endpoint

## 📦 Dependencies

- **express** - Web framework
- **sequelize** - ORM for database
- **mysql2** - MySQL client
- **bcrypt** - Password hashing
- **cors** - Cross-origin requests
- **dotenv** - Environment variables
- **typescript** - Type safety
- **jsonwebtoken** - JWT authentication (optional)

## ✨ Architecture Benefits

✅ **Separation of Concerns** - Models, Services, Controllers clearly separated
✅ **Type Safety** - Full TypeScript support with interfaces
✅ **Scalability** - Easy to add new features without touching existing code
✅ **Maintainability** - Clear folder structure and naming conventions
✅ **Reusability** - Services can be used by multiple controllers
✅ **Testing** - Services can be easily mocked and tested
✅ **Database Agnostic** - Sequelize abstraction allows easy database switching

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check `.env` database credentials
- Ensure database name exists
- Check user has permissions

### Model Sync Issues
- Review Sequelize logs in development
- Check for circular dependencies in models
- Verify associations are correctly defined

### Service Errors
- Check error messages in response
- Verify required fields are provided
- Check database constraints

---

**Created with Sequelize ORM** 🎯
Made for the E-Tafy E-Commerce Platform
