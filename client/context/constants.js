import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";

import socialMediaDapp from "./SocialMediaDapp.json";

export const CONTRACT_ABI = socialMediaDapp.abi;
export const CONTRACT_ADDRESS = "0xF859e215A276EC632Fb46DCca4EbccF99C8993D2";

export const PINATA_API_KEY = "da212708ca61ceb1b91d";
export const PINATA_SECRECT_KEY = "ce9bea71753244b0e67a0b3039e09889b69d15b863d25f3b9110449afae55c05";

// NETWORK
const networks = {
  linea: {
    chainId: `0x${Number(59144).toString(16)}`,
    chainName: "Linea",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.linea.build/"],
    blockExplorerUrls: ["https://lineascan.build/"],
  },
  linea_sepolia: {
    chainId: `0x${Number(59141).toString(16)}`,
    chainName: "Linea Sepolia",
    nativeCurrency: {
      name: "LineaETH",
      symbol: "LineaETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.sepolia.linea.build"],
    blockExplorerUrls: ["https://sepolia.lineascan.build/"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: [""],
  },
};

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "linea_sepolia";
  await changeNetwork({ networkName });
};

export const checkIfWalletConnected = async () => {
  if (!window.ethereum) return console.log("Please Install MetaMask");
  const network = await handleNetworkSwitch();

  const account = await window.ethereum.request({ method: "eth_accounts" });

  if (account.length) {
    return account[0];
  } else {
    console.log("Please Install MetaMask & Connect, Reload");
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return alert("Please install MetaMask");
    const network = await handleNetworkSwitch();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  } catch (error) {
    console.log(error);
  }
};
