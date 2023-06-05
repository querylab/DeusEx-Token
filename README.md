## DeusEx-Token (ERC20)
Deploys on Sepolia TestNetwork. Built with Solidity using Hardhat.

### Setting Up

### 1. Clone the repository

### 2. Install dependencies

```bash
$ cd DeusEx-Token
$ npm install --save-dev hardhat
$ npm install --save dotenv @nomiclabs/hardhat-etherscan @openzeppelin/contracts @nomicfoundation/hardhat-chai-matchers @nomicfoundation/hardhat-toolbox @nomiclabs/hardhat-ethers
```

### 3. Compile
```bash
$ npx hardhat clean
$ npx hardhat compile
```

### 4. Deployment
```bash
$ npx hardhat run scripts/deploy.js --network sepolia
```
<a href="https://imgur.com/UMBYIGp"><img src="https://i.imgur.com/UMBYIGp.gif" title="source: imgur.com" /></a>
