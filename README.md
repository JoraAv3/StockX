# StockX – Decentralized AI-Powered Stock Exchange

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Solidity](https://img.shields.io/badge/Solidity-^0.8.0-lightgrey)](https://soliditylang.org/)
[![React](https://img.shields.io/badge/React-18.0-blue)](https://reactjs.org/)

**StockX** is a decentralized, AI-powered stock exchange platform designed to enable secure, transparent, and near-real-time trading of tokenized equities. By combining blockchain-based settlement, smart contract automation, decentralized identity, and AI-driven market intelligence, StockX removes traditional intermediaries while preserving regulatory compliance and institutional-grade reliability.

## 🎯 Key Features

- **🪙 Tokenized Equities**: ERC-20/ERC-1400 security tokens representing real-world equities with fractional ownership
- **⚡ High-Performance Matching**: Off-chain matching engine for fast order processing and low-latency trades
- **🤖 AI-Powered Insights**: Market intelligence, sentiment analysis, and personalized trading recommendations
- **🔐 Compliance & Security**: On-chain KYC/AML enforcement with decentralized identity (DID)
- **🏛️ DAO Governance**: Token-holder voting on protocol upgrades, fee structures, and market parameters
- **⚖️ Transparent Settlement**: Atomic trade settlement with delivery-versus-payment (DvP) logic

## 📋 Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Smart Contracts](#smart-contracts)
- [AI Services](#ai-services)
- [Contributing](#contributing)
- [License](#license)

## 🏗️ Architecture

StockX follows a **hybrid on-chain / off-chain architecture**:

```
Users & Institutions
        ↓
Frontend (Web / Mobile)
        ↓
Backend APIs & Relayers
        ↓
Off-chain Matching Engine + AI Services
        ↓
Smart Contracts (EVM)
        ↓
Blockchain Ledger & DAO Governance
```

### Architecture Layers

1. **On-Chain Layer**: Trust, ownership, settlement, and governance
2. **Off-Chain Layer**: Performance-critical logic, AI computation, and user experience
3. **Integration Layer**: External data providers, compliance services, and custodial systems

## 🛠️ Tech Stack

### Blockchain & Smart Contracts
- **EVM-compatible chain** (Ethereum L2 / Besu-based permissioned network)
- **Solidity** with OpenZeppelin libraries
- **Hardhat** for development and testing

### Backend
- **Node.js** + **Express** (JavaScript)
- Event-driven architecture
- WebSocket for real-time updates
- Redis for caching
- PostgreSQL for data persistence

### Frontend
- **React** + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- Wallet integration (Web3)

### AI & Data Services
- **Python** + **FastAPI**
- NLP & ML models for sentiment analysis
- Streaming data pipelines
- Portfolio optimization algorithms

### Infrastructure
- **Docker** & **Docker Compose** for containerization
- **Kubernetes** for orchestration
- **Terraform** for infrastructure as code
- **Prometheus** for monitoring
- **GitHub Actions** for CI/CD

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Python >= 3.9
- Docker & Docker Compose (optional)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/stockx.git
   cd stockx
   ```

2. **Install dependencies**
   
   Root dependencies:
   ```bash
   npm install
   ```
   
   Frontend:
   ```bash
   cd frontend
   npm install
   cd ..
   ```
   
   Backend:
   ```bash
   cd backend
   npm install
   cd ..
   ```
   
   Smart Contracts:
   ```bash
   cd smart-contracts
   npm install
   cd ..
   ```

3. **Install Python dependencies**
   ```bash
   cd ai-services
   pip install -r requirements.txt
   cd ..
   ```

4. **Set up environment variables**
   
   Copy `.env.example` files in respective directories and configure:
   - `frontend/.env`
   - `backend/.env`
   - `smart-contracts/.env`
   - `ai-services/.env`

### Running Locally

1. **Start the backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Start AI services** (optional)
   ```bash
   cd ai-services
   python -m uvicorn src.api.main:app --reload
   ```

4. **Run smart contracts locally**
   ```bash
   cd smart-contracts
   npx hardhat node
   ```

## 📁 Project Structure

```
stocks/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
│
├── backend/               # Node.js backend API
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Data models
│   │   └── routes/        # API routes
│   └── package.json
│
├── smart-contracts/       # Solidity smart contracts
│   ├── contracts/
│   │   ├── core/          # Core contracts (TokenizedStock, OrderBook)
│   │   ├── compliance/    # Compliance contracts
│   │   ├── governance/    # DAO governance
│   │   └── oracles/       # Price oracles
│   ├── test/              # Contract tests
│   └── scripts/           # Deployment scripts
│
├── ai-services/           # Python AI services
│   ├── src/
│   │   ├── analytics/     # Market analysis
│   │   ├── sentiment/     # Sentiment analysis
│   │   ├── models/        # ML models
│   │   └── api/           # FastAPI endpoints
│   └── requirements.txt
│
├── infrastructure/        # DevOps configuration
│   ├── docker/            # Dockerfiles
│   ├── kubernetes/        # K8s manifests
│   ├── terraform/         # Infrastructure as code
│   └── ci-cd/             # CI/CD pipelines
│
├── docs/                  # Documentation
│   ├── api/               # API documentation
│   ├── architecture/      # Architecture docs
│   ├── deployment/        # Deployment guides
│   └── user-guide/        # User guides
│
├── scripts/               # Utility scripts
├── shared/                # Shared types and utilities
└── README.md
```

## 💻 Development

### Running Tests

**Backend tests:**
```bash
cd backend
npm test
```

**Smart contract tests:**
```bash
cd smart-contracts
npx hardhat test
```

**AI services tests:**
```bash
cd ai-services
pytest tests/
```

### Code Style

- **JavaScript**: ESLint
- **TypeScript**: ESLint + TypeScript compiler
- **Solidity**: Solhint
- **Python**: Black + Flake8

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm run build
```

**Smart Contracts:**
```bash
cd smart-contracts
npx hardhat compile
```

## 🔐 Smart Contracts

The platform uses several core smart contracts:

- **TokenizedStock**: ERC-20 security tokens with compliance checks
- **OrderBook**: Trade settlement and order matching coordination
- **ComplianceRegistry**: KYC/AML status management
- **CustodyVault**: Multi-signature custody for assets
- **DAO**: Governance and voting system
- **PriceOracle**: External price feed integration

See [smart-contracts/README.md](smart-contracts/README.md) for detailed documentation.

## 🤖 AI Services

The AI layer provides:

- **Sentiment Analysis**: News, social media, and earnings report analysis
- **Signal Generation**: Bullish/bearish indicators and trading signals
- **Price Prediction**: ML-based price forecasting
- **Portfolio Optimization**: Risk-adjusted portfolio recommendations

See [ai-services/README.md](ai-services/README.md) for more details.

## 📚 Documentation

- [API Documentation](docs/api/README.md)
- [Architecture Guide](docs/architecture/README.md)
- [Deployment Guide](docs/deployment/README.md)
- [User Guide](docs/user-guide/README.md)
- [Security Documentation](docs/security/README.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Developed by the StockX team at LynqEx Labs:

- **Alex Chen** - AI/ML Engineer
- **Sarah Martinez** - Full Stack Developer
- **David Kim** - DevOps/Infrastructure
- **Emma Wilson** - Technical Writer
- **Michael Brown** - Smart Contract Developer

## 📞 Contact

For questions and support:

- **Email**: support@lynqexlabs.com
- **Website**: https://lynqexlabs.com
- **Documentation**: See `docs/` directory

## 🙏 Acknowledgments

- OpenZeppelin for security-tested smart contract libraries
- Chainlink for oracle solutions
- The Ethereum community for inspiration and tools

---

**Note**: This is a Proof of Concept (PoC) implementation. Production deployment requires additional security audits, compliance reviews, and infrastructure hardening.
