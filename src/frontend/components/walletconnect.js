import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import Web3Modal from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, mainnet, polygon } from "wagmi/chains";

const chains = [goerli, mainnet, polygon];
export const projectId = "2Nuz7taK42diXm9I0DNWAEAj8t4";
const { provider } = configureChains(chains, [w3mprovider({ projectId })]);

export const wagmiClient = createClient({
  autoconnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});

export const ethereumClient = new EthereumClient(wagmiClient, chains);
