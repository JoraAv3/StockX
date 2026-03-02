# StockX API Documentation

## Base URL

```
http://localhost:3001/api
```

## Endpoints

### Health Check

**GET** `/health`

Check API health status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-19T12:00:00.000Z"
}
```

### Orders

**POST** `/orders`

Create a new order.

**GET** `/orders`

Get user orders.

**DELETE** `/orders/:id`

Cancel an order.

### Trades

**GET** `/trades`

Get recent trades.

**GET** `/trades/:id`

Get trade details by ID.

### Market Data

**GET** `/market/data`

Get market data for all tokens.

**GET** `/market/tokens`

Get list of available tokens.

## Authentication

Currently, authentication is handled via wallet signatures. Future versions will include JWT tokens.

## Rate Limiting

API requests are rate-limited to prevent abuse. Current limits:
- 100 requests per minute per IP
- 1000 requests per hour per wallet
