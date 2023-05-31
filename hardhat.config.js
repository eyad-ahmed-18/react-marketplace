require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString();

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test",
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    mainnet: {
      url: "https://polygon-mainnet.infura.io/v3/f2a724dd098b4298b61f32d2bc9364f2",
      accounts: [privateKey],
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/f2a724dd098b4298b61f32d2bc9364f2",
      accounts: [privateKey],
    },
  },
};
