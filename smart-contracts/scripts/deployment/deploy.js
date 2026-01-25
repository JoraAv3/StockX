const hre = require("hardhat");

async function main() {
  console.log("Deploying StockX contracts...");

  // Deploy TokenizedStock
  const TokenizedStock = await hre.ethers.getContractFactory("TokenizedStock");
  const tokenizedStock = await TokenizedStock.deploy(
    "Apple Inc. Token",
    "AAPL",
    "AAPL",
    ethers.parseEther("1000000")
  );
  await tokenizedStock.waitForDeployment();
  console.log("TokenizedStock deployed to:", await tokenizedStock.getAddress());

  // Deploy OrderBook
  const OrderBook = await hre.ethers.getContractFactory("OrderBook");
  const orderBook = await OrderBook.deploy();
  await orderBook.waitForDeployment();
  console.log("OrderBook deployed to:", await orderBook.getAddress());

  // Deploy ComplianceRegistry
  const ComplianceRegistry = await hre.ethers.getContractFactory("ComplianceRegistry");
  const complianceRegistry = await ComplianceRegistry.deploy();
  await complianceRegistry.waitForDeployment();
  console.log("ComplianceRegistry deployed to:", await complianceRegistry.getAddress());

  console.log("✅ All contracts deployed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
