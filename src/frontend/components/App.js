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
import Collectibles from "./collectibles";
import Coworkingspace from "./coworkingspace";
import Skillsharing from "./skillsharing";
import Entertainment from "./entertainment";
import Web3Modal from "web3modal";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  const [collectionName, setCollectionName] = useState({});

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
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
    const collectionName = await getCollectionName(nft);
    setCollectionName(collectionName);

    setLoading(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation web3Handler={web3Handler} account={account} />
        </>
        <div>
          {/* {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
              }}
            >
              <Spinner animation="grow" style={{ display: "flex" }} />
              <p className="mx-3 my-0">Connect your E-Wallet...</p>
            </div>
          ) : ( */}
          <Routes>
            <Route
              path="/"
              element={<LandingPage marketplace={marketplace} nft={nft} />}
            />
            <Route
              path="/home"
              element={<Home marketplace={marketplace} nft={nft} />}
            />
            <Route
              path="/create"
              element={<Create marketplace={marketplace} nft={nft} />}
            />
            <Route
              path="/my-listed-items"
              element={
                <MyListedItems
                  marketplace={marketplace}
                  nft={nft}
                  account={account}
                />
              }
            />
            <Route
              path="/my-purchases"
              element={
                <MyPurchases
                  marketplace={marketplace}
                  nft={nft}
                  account={account}
                />
              }
            />
            <Route
              path="/collection/:collectionName"
              element={
                <CollectionPage
                  collectionName={collectionName}
                  marketplace={marketplace}
                  nft={nft}
                />
              }
            />
            <Route path="/launchpad" element={<Launchpad />} />
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/collectibles"
              element={<Collectibles marketplace={marketplace} nft={nft} />}
            />
            <Route
              path="/coworkingspace"
              element={<Coworkingspace marketplace={marketplace} nft={nft} />}
            />
            <Route
              path="/skillsharing"
              element={<Skillsharing marketplace={marketplace} nft={nft} />}
            />
            <Route
              path="/entertainment"
              element={<Entertainment marketplace={marketplace} nft={nft} />}
            />
            <Route
              path="/nftform"
              element={<NFTForm marketplace={marketplace} nft={nft} />}
            />
          </Routes>
          {/* )} */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import { Spinner } from "react-bootstrap";

// import Navigation from "./Navbar";
// import CollectionPage from "./Collection";
// import Home from "./Home.js";
// import Create from "./Create.js";
// import MyListedItems from "./MyListedItems.js";
// import MyPurchases from "./MyPurchases.js";
// import MarketplaceAbi from "../contractsData/Marketplace.json";
// import MarketplaceAddress from "../contractsData/Marketplace-address.json";
// import NFTAbi from "../contractsData/NFT.json";
// import NFTAddress from "../contractsData/NFT-address.json";
// import "./App.css";
// import Categories from "./Categories";
// import LandingPage from "./LandingPage";
// import Launchpad from "./Launchpad";
// import CarRental from "./CarRental";

// import {
//   EthereumClient,
//   w3mConnectors,
//   w3mProvider,
// } from "@web3modal/ethereum";
// import { Web3Modal, Web3Button } from "@web3modal/react";
// import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import { arbitrum, mainnet, polygon } from "wagmi/chains";

// function App() {
//   const chains = [arbitrum, mainnet, polygon];
//   const projectId = "5d302ecc433c8492454c7c450171df97";

//   const { publicClient } = configureChains(chains, [
//     w3mProvider({ projectId }),
//   ]);
//   const wagmiConfig = createConfig({
//     autoConnect: true,
//     connectors: w3mConnectors({ projectId, version: 2, chains }),
//     publicClient,
//   });
//   const ethereumClient = new EthereumClient(wagmiConfig, chains);

//   const [loading, setLoading] = useState(true);
//   const [account, setAccount] = useState(null);
//   const [nft, setNFT] = useState({});
//   const [marketplace, setMarketplace] = useState({});
//   const [collectionName, setCollectionName] = useState({});

//   useEffect(() => {
//     const connectweb3 = async () => {
//       try {
//         const web3Modal = new Web3Modal();
//         const provider = await web3Modal.connect();
//         const accounts = await provider.request({
//           method: "eth_requestAccounts",
//         });
//         setAccount(accounts[0]);
//         const ethersProvider = new ethers.providers.Web3Provider(provider);
//         const signer = ethersProvider.getSigner();

//         provider.on("chainChanged", () => {
//           window.location.reload();
//         });

//         provider.on("accountsChanged", async function (accounts) {
//           setAccount(accounts[0]);
//           await loadContracts(signer);
//         });

//         await loadContracts(signer);
//       } catch (error) {
//         console.log("Failed to connect to MetaMask:", error);
//       }
//     };

//     connectweb3();
//   });

//   const web3Handler = async () => {
//     const web3Modal = new Web3Modal();
//     const provider = await web3Modal.connect();
//     const accounts = await provider.request({ method: "eth_requestAccounts" });
//     setAccount(accounts[0]);
//     const ethersProvider = new ethers.providers.Web3Provider(provider);
//     const signer = ethersProvider.getSigner();

//     provider.on("chainChanged", () => {
//       window.location.reload();
//     });

//     provider.on("accountsChanged", async function (accounts) {
//       setAccount(accounts[0]);
//       await web3Handler();
//     });

//     loadContracts(signer);
//   };

//   const getCollectionName = async (nft, tokenId) => {
//     try {
//       const uri = await nft.tokenURI(tokenId);
//       const response = await fetch(uri);
//       const metadata = await response.json();
//       return metadata.collectionName;
//     } catch (error) {
//       console.error("Error retrieving collection name:", error);
//       return null;
//     }
//   };

//   const loadContracts = async (signer) => {
//     // Get deployed copies of contracts
//     const marketplace = new ethers.Contract(
//       MarketplaceAddress.address,
//       MarketplaceAbi.abi,
//       signer
//     );
//     setMarketplace(marketplace);

//     const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
//     setNFT(nft);

//     // Retrieve the collection name from NFT metadata
//     const collectionName = await getCollectionName(nft);
//     setCollectionName(collectionName);
//     setLoading(false);
//   };

//   return (
//     <>
//     <WagmiConfig config={wagmiConfig}>
//     <BrowserRouter>
//       <div className="App">
//         <>
//           <Navigation account={account} />
//         </>
//         <div>
//           {loading ? (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 minHeight: "80vh",
//               }}
//             >
//               <Spinner animation="grow" style={{ display: "flex" }} />
//               <p className="mx-3 my-0">Connect your E-Wallet...</p>
//             </div>
//           ) : (
//             <Routes>
//               <Route
//                 path="/"
//                 element={<LandingPage marketplace={marketplace} nft={nft} />}
//               />
//               <Route
//                 path="/home"
//                 element={<Home marketplace={marketplace} nft={nft} />}
//               />
//               <Route
//                 path="/create"
//                 element={<Create marketplace={marketplace} nft={nft} />}
//               />
//               <Route
//                 path="/my-listed-items"
//                 element={
//                   <MyListedItems
//                     marketplace={marketplace}
//                     nft={nft}
//                     account={account}
//                   />
//                 }
//               />
//               <Route
//                 path="/my-purchases"
//                 element={
//                   <MyPurchases
//                     marketplace={marketplace}
//                     nft={nft}
//                     account={account}
//                   />
//                 }
//               />
//               <Route
//                 path="/collection/:collectionName"
//                 element={
//                   <CollectionPage
//                     collectionName={collectionName}
//                     marketplace={marketplace}
//                     nft={nft}
//                   />
//                 }
//               />
//               <Route path="/launchpad" element={<Launchpad />} />
//               <Route path="/categories" element={<Categories />} />
//               <Route path="/carrental" element={<CarRental />} />
//             </Routes>
//           )}
//         </div>
//       </div>
//     </BrowserRouter>

//   </WagmiConfig>

//   <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
//  </>
//   );
// }

// export default App;
