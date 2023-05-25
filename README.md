# About this repository

This is a DeusEx-Token(ERC-720), tests and deploys on Goerli-TestNetwork. Built with Solidity using Hardhat.

# Setting Up


1. Clone the repository

2. Install dependencies

```bash
$ cd DeusEx-Token
$ npm install --save-dev hardhat
$ npx hardhat
$ npm install --save dotenv @nomiclabs/hardhat-etherscan @openzeppelin/contracts
```

3. Compile
```bash
$ npx hardhat compile
```

4. Tests

```bash
$ npx hardhat test
```

5. Deployment
```bash
$ npx hardhat run scripts/deploy.js --network goerli
```
