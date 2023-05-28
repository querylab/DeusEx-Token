// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const MyToken = await ethers.getContractFactory("DeusEx");
  uniswapRouterAddress = "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008" //Uniswap Router Address fork for sepolia Network
  vaultAddress = "0x96d6e82587A513Cb4427255739b40eCF3996Ea1B"//My Sepolia Wallet Address
  const myToken = await MyToken.deploy(uniswapRouterAddress, vaultAddress);
  await myToken.deployed();


  console.log("******************************************");
  console.log("DeusEx-Machina(DX)Token Contract Adress\n");
  console.log(myToken.address);
  console.log("******************************************");

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
