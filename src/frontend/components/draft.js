import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navbar";
import CollectionPage from "./Collection";
import Home from "./Home.js";
import NFTForm from "./nftform.js";
import Create from "./Create.js";
import MyListedItems from "./MyListedItems.js";
import MyPurchases from "./MyPurchases.js";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";
import { useState } from "react";
import { ethers } from "ethers";
import { Spinner } from "react-bootstrap";

import "./App.css";
import Categories from "./Categories";
import LandingPage from "./LandingPage";
import Launchpad from "./Launchpad";
import Collectibles from "./Collectibles";
import CoworkingSpace from "./CoworkingSpace";
import SkillSharing from "./SkillSharing";
import Entertainment from "./Entertainment";
import Web3Modal from "web3modal";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  const [collectionName, setCollectionName] = useState({});

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const web3Modal = new Web3Modal();
    const provider = await web3Modal.connect();
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();

    provider.on("chainChanged", () => {
      window.location.reload();
    });

    provider.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });

    loadContracts(signer);
  };

  const getCollectionName = async (nft, tokenId) => {
    try {
      const uri = await nft.tokenURI(tokenId);
      const response = await fetch(uri);
      const metadata = await response.json();
      return metadata.collectionName;
    } catch (error) {
      console.error("Error retrieving collection name:", error);
      return null;
    }
  };

  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);

    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);

    // Retrieve the collection name from NFT metadata
    // Retrieve the collection name from NFT metadata
    const collectionName = await getCollectionName(nft);
    setCollectionName(collectionName);

    setLoading(false);
  };

  useEffect(() => {
    web3Handler();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create nft={nft} account={account} />} />
          <Route path="/my-listed-items" element={<MyListedItems marketplace={marketplace} account={account} />} />
          <Route path="/my-purchases" element={<MyPurchases marketplace={marketplace} account={account} />} />
          <Route path="/collection/:category" element={<CollectionPage nft={nft} collectionName={collectionName} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/launchpad" element={<Launchpad />} />
          <Route path="/collectibles" element={<Collectibles nft={nft} />} />
          <Route path="/coworking-space" element={<CoworkingSpace nft={nft} />} />
          <Route path="/skill-sharing" element={<SkillSharing nft={nft} />} />
          <Route path="/entertainment" element={<Entertainment nft={nft} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
