const ethers = require("ethers");
const dao = require("../dao/walletsDao")

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = () => async (user_id) => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);
  await dao.insertWallet(user_id, wallet.address, wallet.privateKey);
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}


const getWalletsData = () => async () =>{
  return dao.getWallets();
};

const getWalletData = () => async (user_id) =>  {
  return dao.getWallet(user_id);
};

const getWallet = ({}) => async userId => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  const wallet = await dao.getWallet(userId);
  return new ethers.Wallet(wallet.private_key, provider);
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
});
