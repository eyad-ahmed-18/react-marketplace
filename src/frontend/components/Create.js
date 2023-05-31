import { useState } from "react";
import { ethers } from "ethers";
import { Buffer } from "buffer";
import { Row, Form, Button } from "react-bootstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";
const projectId = "2Nuz7taK42diXm9I0DNWAEAj8t4";
const projectSecret = "3ed0d85503fea0223fd40c7da0ff9644";
const auth =
  "Basic " +
  Buffer.from(projectId + ":" + projectSecret, "utf8").toString("base64");

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collectionName, setCollectionName] = useState("");

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        console.log(result);
        setImage(`https://theblock.infura-ipfs.io/ipfs/${result.path}`);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };
  const createNFT = async () => {
    if (!image || !price || !name || !description || !collectionName) return;
    try {
      const result = await client.add(
        JSON.stringify({ image, price, name, description, collectionName })
      );
      mintThenList(result);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };
  const mintThenList = async (result) => {
    const uri = `https://theblock.infura-ipfs.io/ipfs/${result.path}`;
    // mint nft
    await (await nft.mint(uri)).wait();
    // get tokenId of new nft
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (
      await marketplace.makeItem(collectionName, nft.address, id, listingPrice)
    ).wait();
  };
  return (
    <div className="container-fluid mt-5">
      <div className="row-form">
        <main
          role="main"
          className="col-lg-12 mx-auto"
          style={{ maxWidth: "1000px" }}
        >
          <div>
            <Row className="g-4 rowform">
              <Form.Control
                type="file"
                className="form"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control
                className="form"
                onChange={(e) => setName(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Name"
              />
              <Form.Control
                className="form"
                onChange={(e) => setCollectionName(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Collection Name"
              />
              <Form.Control
                className="form"
                onChange={(e) => setDescription(e.target.value)}
                size="lg"
                required
                as="textarea"
                placeholder="Description"
              />
              <Form.Control
                className="form"
                onChange={(e) => setPrice(e.target.value)}
                size="lg"
                required
                type="number"
                placeholder="Price in ETH"
              />
              <div className="d-grid px-0">
                <Button
                  className="create-nft"
                  onClick={createNFT}
                  variant="primary"
                  size="lg"
                >
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;
