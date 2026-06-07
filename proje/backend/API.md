# Next.js Backend API

A Next.js backend API for the BabyCare application with CORS support and JWT authentication.

## Features

- **CORS Support**: Configured for frontend at `https://lightblue-horse-121787.hostingersite.com`
- **API Endpoints**:
  - `/api/login` - User authentication
  - `/api/products` - Get products list
  - `/api/videos` - Get videos list
  - `/api/orders` - Get/Create orders
- **Development Environment**: Uses port 3001 by default
- **Production Environment**: Deployed at `https://snow-narwhal-843656.hostingersite.com`

## Installation

```bash
npm install
```

## Running Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3001/api`

## Build for Production

```bash
npm run build
npm run start
```

## API Endpoints

### Login
- **URL**: `/api/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "admin@site.com",
    "password": "Admin123!"
  }
  ```
- **Response**: `{ ok: true, token: "...", message: "Login successful" }`

### Products
- **URL**: `/api/products`
- **Method**: `GET`
- **Response**: Array of products

### Videos
- **URL**: `/api/videos`
- **Method**: `GET`
- **Response**: Array of videos

### Orders
- **URL**: `/api/orders`
- **Method**: `GET` / `POST`
- **GET Response**: Array of orders
- **POST Body**:
  ```json
  {
    "product": "Product Name",
    "quantity": 1
  }
  ```

## CORS Configuration

The backend is configured to accept requests from:
- Development: `http://localhost:*` (any localhost port)
- Production: `https://lightblue-horse-121787.hostingersite.com`

Credentials are supported for cookie-based authentication with `SameSite=None` and `Secure` flags.

## Environment Variables

- **Development** (`.env.local`):
  ```
  NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
  ```

- **Production** (`.env.production`):
  ```
  NEXT_PUBLIC_BACKEND_URL=https://snow-narwhal-843656.hostingersite.com
  ```
