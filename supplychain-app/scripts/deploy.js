const hre = require("hardhat");

async function main() {
  const ProductRegistry = await hre.ethers.getContractFactory(
    "ProductRegistry"
  );
  const productRegistry = await ProductRegistry.deploy();

  await productRegistry.waitForDeployment();
  let address = await productRegistry.getAddress();
  console.log(`ProductRegistry deployed to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
