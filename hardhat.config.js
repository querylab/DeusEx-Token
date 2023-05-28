require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers")

// Go to https://alchemy.com, sign up, create a new App in
// its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "A8VbeuXInJr4glUYQupSV5PMYO7XCG5r"; //CHANGE YOUR API-KEY FROM ALCHEMY

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts

// My Private Key of My Wallet Sepolia Metamask
const SEPOLIA_PRIVATE_KEY = "9b0477722649da900cf3b9ec44929a77h67d79b5665959477b2436ae46df2598"; //Put You Sepolia Private Key here

module.exports = {
  solidity: {
    compilers: [

        {
            version: "0.8.16",
        },

    ],

  },
  
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    cache: "./cache",
    tests: "./test"
  },

  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }

 
};
