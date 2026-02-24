# Foodverse 🍔

Full-Stack Food Delivery Platform
Node.js · Express · MongoDB · React · Vite · Tailwind

---

## 🚀 Overview

Foodverse is a role-based food delivery system with three user types:

* **Customer** – Browse restaurants, place orders
* **Vendor** – Manage restaurants and orders
* **Delivery Partner** – Accept and deliver orders

It uses:

* Express + MongoDB for backend API
* JWT authentication
* React + Vite frontend
* Layered backend architecture (Repository → Service → Controller)

---

## 🛠 Tech Stack

**Backend**

* Node.js
* Express
* MongoDB + Mongoose
* JWT Authentication

**Frontend**

* React
* Vite
* Tailwind CSS
* Context API (Auth + Cart)

---

## ⚡ Quick Start (Linux/macOS)

```bash
./start.sh
```

## ⚡ Quick Start (Windows PowerShell)

```powershell
./start.ps1
```

These scripts:

* Create `backend/.env` from `.env.example` if missing
* Install dependencies (if not installed)
* Start backend on **[http://localhost:5000](http://localhost:5000)**
* Start frontend on **[http://localhost:5173](http://localhost:5173)**
* Use Vite proxy to avoid CORS issues

---

## 🔧 Manual Setup

### 1️⃣ Backend Setup

```bash
cd backend
cp .env.example .env
```

Update `.env`:

```bash
MONGO_URI=mongodb://localhost:27017/food_delivery
JWT_SECRET=your_super_secret_key
```

Then:

```bash
npm install
npm run dev
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 👥 User Flows

### 🧑 Customer

* Register with role `User`
* Browse `/restaurants`
* Add items to cart
* Checkout at `/checkout`
* Track orders at `/orders`

---

### 🏪 Vendor

* Register with role `Vendor`
* Go to `/vendor`
* Create restaurant
* Add menu items
* Update order status:

  * `preparing`
  * `ready_for_pickup`

---

### 🚚 Delivery Partner

* Register with role `Delivery Partner`
* Go to `/delivery`
* Accept available orders
* Mark orders as delivered

---

## 🔌 API Routes

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/me`

### Restaurants

* `GET /api/restaurants`
* `POST /api/restaurants`
* `GET /api/restaurants/:id`
* `POST /api/restaurants/:id/menu`

### Orders

* `POST /api/orders`
* `GET /api/orders/my`
* `GET /api/orders/vendor`
* `GET /api/orders/available`
* `POST /api/orders/:id/accept`
* `PATCH /api/orders/:id/status`

---

## 🏗 Architecture

### Backend Structure

```
backend/src/
  config/         → Database connection
  models/         → Mongoose schemas
  repositories/   → Data access layer
  services/       → Business logic
  controllers/    → HTTP layer
  routes/         → API routes
  middlewares/    → Auth & error handling
  utils/          → Helpers
  app.js
  server.js
```

### Backend Flow

Request → Route → Controller → Service → Repository → Model → Database

Response travels back up the same chain.

---

### Frontend Structure

```
frontend/src/
  components/     → Reusable UI
  pages/          → Page-level views
  services/       → API calls
  context/        → Global state (Auth + Cart)
  App.jsx
  main.jsx
```

---

## 🔐 Security Notes

* `.env` files are ignored
* Only `.env.example` is committed
* `node_modules` is ignored
* JWT-based authentication

---

## 📦 Deployment Ready?

To deploy:

* Set production `MONGO_URI`
* Set secure `JWT_SECRET`
* Configure environment variables in hosting platform
* Build frontend:

```bash
npm run build
```
