## BACKEND STRUCTURE - Node.js/Express

```
etafy/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── user.controller.ts
│   │   ├── product.controller.ts
│   │   ├── order.controller.ts
│   │   └── auth.controller.ts
│   │
│   ├── services/             # Business logic
│   │   ├── user.service.ts
│   │   ├── product.service.ts
│   │   ├── order.service.ts
│   │   └── auth.service.ts
│   │
│   ├── routes/               # API routes
│   │   └── api.routes.ts
│   │
│   ├── middleware/           # Custom middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── logger.middleware.ts
│   │
│   ├── database/
│   │   ├── prisma.ts        # Database client
│   │   └── migrations/
│   │
│   ├── config/
│   │   ├── env.ts
│   │   └── database.ts
│   │
│   └── server.ts            # Main entry point
│
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seeding
│
├── dist/                    # Compiled output
├── node_modules/
├── package.json
├── tsconfig.json
└── README.md
```

## Controllers (Request Handlers)

Each controller has methods for:
- **GET** all items
- **GET** by ID
- **POST** create
- **PUT** update
- **DELETE** remove

Example: `UserController.getAll()`, `ProductController.getById()`

## Services (Business Logic)

Services contain database queries and business logic:
- Query database with Prisma
- Data transformation
- Validation
- Error handling

## Routes (API Endpoints)

```
POST   /api/auth/login              # User login
POST   /api/auth/register           # User registration
GET    /api/users                   # Get all users
GET    /api/users/:id               # Get user by ID
POST   /api/users                   # Create user
PUT    /api/users/:id               # Update user
DELETE /api/users/:id               # Delete user

GET    /api/products                # Get all products
GET    /api/products/:id            # Get product by ID
GET    /api/products/category/:id   # Get by category
GET    /api/products/seller/:id     # Get by seller
GET    /api/products/search         # Search products
POST   /api/products                # Create product
PUT    /api/products/:id            # Update product
DELETE /api/products/:id            # Delete product

GET    /api/orders                  # Get all orders
GET    /api/orders/:id              # Get order by ID
GET    /api/orders/buyer/:id        # Get buyer orders
GET    /api/orders/seller/:id       # Get seller orders
POST   /api/orders                  # Create order
PUT    /api/orders/:id              # Update order
DELETE /api/orders/:id              # Delete order
PATCH  /api/orders/:id/status       # Update status
```

## Dependencies

```json
{
  "express": "^4.18.0",
  "typescript": "^5.0.0",
  "@prisma/client": "^5.0.0",
  "dotenv": "^16.0.0",
  "cors": "^2.8.0",
  "jsonwebtoken": "^9.0.0",
  "bcrypt": "^5.1.0"
}
```

## Running the Backend

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build

# Run production
npm start
```
