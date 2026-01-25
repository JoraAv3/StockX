# Deployment Guide

## Prerequisites

- Docker and Docker Compose
- Node.js >= 18
- PostgreSQL >= 14
- Redis >= 7

## Local Development Setup

1. **Start infrastructure services**
   ```bash
   docker-compose -f infrastructure/docker/docker-compose.yml up -d
   ```

2. **Run migrations** (when database schema is ready)
   ```bash
   cd backend
   npm run migrate
   ```

3. **Start services**
   ```bash
   # Root directory
   npm run dev
   ```

## Production Deployment

### Using Docker

```bash
# Build images
docker build -f infrastructure/docker/Dockerfile.frontend -t stockx-frontend .
docker build -f infrastructure/docker/Dockerfile.backend -t stockx-backend .

# Run with docker-compose (production config)
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

See individual service README files for deployment instructions:
- [Frontend Deployment](frontend/README.md)
- [Backend Deployment](backend/README.md)
- [Smart Contracts Deployment](smart-contracts/README.md)

## Environment Variables

Required environment variables are documented in `.env.example` files in each service directory.

## Monitoring

Production deployments should include:
- Application monitoring (e.g., Sentry)
- Infrastructure monitoring (e.g., Prometheus)
- Log aggregation (e.g., ELK stack)
