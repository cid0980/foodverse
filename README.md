# Food Delivery App (Node/Express + MongoDB + React)

## One-Command Start

```bash
./start.sh
```

This will:
- Ensure `backend/.env` exists (copies from `.env.example` if missing).
- Install backend/frontend dependencies if needed.
- Start backend (port 5000) and frontend (port 5173).
- Attempt to start MongoDB via `systemctl` on Ubuntu if `mongod` is installed.
- Use a Vite proxy so the frontend calls `/api` without CORS issues.

## Quick Setup

1. `cd backend`
2. `cp .env.example .env`
3. Update `backend/.env`:

```bash
MONGO_URI=mongodb://localhost:27017/food_delivery
JWT_SECRET=change_me
```

## Usage Summary

### Customer (User)
1. Sign up at `http://localhost:5173/signup` with role `User`.
2. Browse restaurants: `/restaurants`.
3. Add menu items to cart.
4. Checkout at `/checkout` to place an order.
5. Track orders at `/orders`.

### Vendor
1. Sign up at `/signup` with role `Vendor`.
2. Go to `/vendor`.
3. Create restaurant, add menu items with image URLs.
4. Update order status to `preparing` then `ready_for_pickup`.

### Delivery Partner
1. Sign up at `/signup` with role `Delivery Partner`.
2. Go to `/delivery`.
3. Accept available orders and mark as delivered.

## API Routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/restaurants`
- `POST /api/restaurants` (vendor/admin)
- `GET /api/restaurants/:id`
- `POST /api/restaurants/:id/menu` (vendor/admin)
- `POST /api/orders` (customer/admin)
- `GET /api/orders/my`
- `GET /api/orders/vendor` (vendor/admin)
- `GET /api/orders/available` (delivery_partner/admin)
- `POST /api/orders/:id/accept` (delivery_partner/admin)
- `PATCH /api/orders/:id/status` (vendor/delivery_partner/admin)

## Architecture

### Backend layers

```
backend/src/
  config/         # DB connection
  models/         # Mongoose schemas
  repositories/   # DB access layer
  services/       # Business logic
  controllers/    # HTTP handlers
  routes/         # URL routing
  middlewares/    # auth, error handling
  utils/          # shared helpers
  app.js
  server.js
```

### Frontend layers

```
frontend/src/
  components/     # Reusable UI
  pages/          # Page-level logic
  services/       # API calls
  context/        # Auth + cart state
  hooks/          # Shared hooks
  utils/          # Helpers
  App.jsx
  main.jsx
```
