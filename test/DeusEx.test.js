const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function launchAndFundWalletA() {
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    deadline = blockBefore.timestamp + 500;

    const [deployer, vaultWallet, walletA, walletB] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("DeusEx");
    const uniswapRouter = await ethers.getContractAt("IUniswapV2Router02", "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
    const myToken = await MyToken.deploy(uniswapRouter.address, vaultWallet.address);

    await myToken.approve(uniswapRouter.address, ethers.utils.parseEther("500000"))
    await uniswapRouter.addLiquidityETH(
      myToken.address,
      ethers.utils.parseEther("500000"),
      ethers.utils.parseEther("0"),
      ethers.utils.parseEther("0"),
      deployer.address,
      deadline,
      { value: ethers.utils.parseEther("1") })

    await myToken.transfer(walletA.address, ethers.utils.parseEther("1000"))
    return { uniswapRouter, myToken, vaultWallet, walletA, walletB, deadline };
  }


  describe("Fee collection", function () {
    it("Should collect fees on P2P", async function () {
      const { uniswapRouter, myToken, vaultWallet, walletA, walletB } = await loadFixture(launchAndFundWalletA);
      await myToken.connect(walletA).transfer(walletB.address, ethers.utils.parseEther("100"))
      expect(
        ethers.utils.parseEther("95.0")
      ).to.equal(
        await myToken.balanceOf(walletB.address)
      );
      expect(
        ethers.utils.parseEther("5.0")
      ).to.equal(
        await myToken.balanceOf(vaultWallet.address)
      );
    });



    it("Should collect fees on Buy", async function () {
      const { uniswapRouter, myToken, vaultWallet, walletA, walletB, deadline } = await loadFixture(launchAndFundWalletA);

      await myToken.connect(walletA).approve(uniswapRouter.address, ethers.utils.parseEther("100.0"))
      await uniswapRouter.connect(walletA).swapETHForExactTokens(
          ethers.utils.parseEther("100.0"),
          [await uniswapRouter.WETH(), myToken.address],
          walletA.address,
          deadline,
          { value: ethers.utils.parseEther("0.1") })

      expect(
        ethers.utils.parseEther("10.0")
      ).to.equal(
        await myToken.balanceOf(vaultWallet.address)
      );
    });

    it("Should collect fees on Sell", async function () {
      const { uniswapRouter, myToken, vaultWallet, walletA, walletB, deadline } = await loadFixture(launchAndFundWalletA);

      await myToken.connect(walletA).approve(uniswapRouter.address, ethers.utils.parseEther("100.0"))
      await uniswapRouter.connect(walletA).swapExactTokensForETHSupportingFeeOnTransferTokens(
        ethers.utils.parseEther("100.0"),
        ethers.utils.parseEther("0"),
        [myToken.address, await uniswapRouter.WETH()],
        walletA.address,
        deadline)

      expect(
        ethers.utils.parseEther("15.0")
      ).to.equal(
        await myToken.balanceOf(vaultWallet.address)
      );
    });
  });
});
