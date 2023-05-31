import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { ethers } from "ethers";

const CollectionPage = ({ collectionName, marketplace, nft }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
        const itemCount = await marketplace.itemCount();
        const nftList = [];
      
        for (let i = 1; i <= itemCount; i++) {
          const item = await marketplace.items(i);
          const uri = await nft.tokenURI(item.tokenId);
          const response = await fetch(uri);
          const metadata = await response.json();
      
          if (metadata.collectionName === collectionName) {
            const totalPrice = ethers.utils.formatEther(
              ethers.BigNumber.from(item.price).add(item.fee)
            );
      
            const nftItem = {
              itemId: item.itemId,
              tokenId: item.tokenId,
              price: item.price,
              seller: item.seller,
              sold: item.sold,
              metadata: metadata,
              totalPrice: totalPrice,
            };
      
            nftList.push(nftItem);
          }
        }
      
        setNfts(nftList);
      };

    fetchNFTs();
  }, [collectionName, marketplace, nft]);

  const buyMarketItem = async (itemId, price) => {
    try {
      const transaction = await marketplace.buyMarketItem(itemId, {
        value: price,
      });
      await transaction.wait();
      // Item purchased successfully, you can perform any additional actions here
      console.log("Item purchased:", itemId);
    } catch (error) {
      console.error("Error purchasing item:", error);
      // Handle error and provide feedback to the user
    }
  };

  return (
    <Container>
      <h1 className="mt-4 mb-4">Collection: {collectionName}</h1>
      {nfts.length === 0 ? (
        <p>No NFTs available in this collection.</p>
      ) : (
        <Row>
          {nfts.map((nft) => (
            <Col key={nft.itemId} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={nft.metadata.image} />
                <Card.Body>
                  <Card.Title>Item ID: {nft.itemId}</Card.Title>
                  <Card.Text>NFT Token ID: {nft.tokenId}</Card.Text>
                  <Card.Text>Price: {nft.price}</Card.Text>
                  <Card.Text>Seller: {nft.seller}</Card.Text>
                  {nft.sold ? (
                    <Card.Text>Status: Sold</Card.Text>
                  ) : (
                    <>
                      <Card.Text>Status: Available</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() =>
                          buyMarketItem(nft.itemId, nft.totalPrice)
                        }
                      >
                        Buy Now
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CollectionPage;
