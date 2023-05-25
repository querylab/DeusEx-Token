// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const MyToken = await ethers.getContractFactory("DeusEx");
  uniswapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
  vaultAddress = "0x86d6e8928cA513Cb4427255739b40eCF3996Ea1B"//My Goerli Wallet Address
  const myToken = await MyToken.deploy(uniswapRouterAddress, vaultAddress);
  await myToken.deployed();
  console.log("DeusEx-Machina launched at:", myToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
