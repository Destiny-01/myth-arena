import MythToken from "../contract/abi/MythToken.json";
import Myth from "../contract/abi/Myth.json";
import { ethers, providers, utils } from "ethers";
import { wcProvider } from "./connect";

console.log(wcProvider, window.ethereum);
console.log(new providers.Web3Provider(wcProvider));
const provider = window.ethereum
  ? new providers.Web3Provider(window.ethereum)
  : // new providers.Web3Provider(new providers.getDefaultProvider());
    // new wcProvider);
    new providers.Web3Provider(wcProvider);

const signer = provider.getSigner();

export const tokenContract = new ethers.Contract(
  MythToken.address,
  MythToken.abi,
  signer
);
export const contract = new ethers.Contract(Myth.address, Myth.abi, signer);

export const initialMint = async () => {
  try {
    const res = await contract.initialMint();
    const tx = await res.wait();

    return tx?.transactionHash;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const initGame = async (id, eggs, action) => {
  try {
    const res = await contract.initGame(id, eggs, action);
    const tx = await res.wait();

    return tx?.transactionHash;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const wonGame = async (id, eggs, game) => {
  try {
    const res = await contract.wonGame(id, eggs, game);
    const tx = await res.wait();

    return tx?.transactionHash;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getBalance = async (address) => {
  try {
    const balance = await tokenContract.balanceOf(address);
    const addresses = Array(10).fill(address);
    const eggs = await contract.balanceOfBatch(
      addresses,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    );

    return {
      balance: balance ? Math.floor(utils.formatEther(balance.toString())) : 0,
      eggsBalance: eggs.map(String),
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};
