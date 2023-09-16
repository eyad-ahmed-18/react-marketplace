import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";

const CollectionPage = ({ marketplace, nft }) => {
  const { collectionName } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const loadCollectionItems = async (collectionName) => {
    // Load items from the specified collection
    const itemCount = await marketplace.itemCount();
    let collectionItems = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        if (metadata.collectionName === collectionName) {
          // get total price of item (item price + fee)
          const totalPrice = await marketplace.getTotalPrice(item.itemId);
          // Add item to collectionItems array
          collectionItems.push({
            totalPrice,
            collectionName: metadata.collectionName,
            itemId: item.itemId,
            seller: item.seller,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
          });
        }
      }
    }
    setLoading(false);
    setItems(collectionItems);
  };

  const buyMarketItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadCollectionItems(collectionName);
  };

  useEffect(() => {
    loadCollectionItems(collectionName);
  });

  if (loading) {
    return (
      

      <div
        style={{
          padding: "1rem 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Spinner animation="grow" style={{ display: "flex" }} />
        <h2 className="mx-3 my-0">Loading...</h2>
      </div>
      
    );
  }

  if (!items.length) {
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>No Items in the Collection</h2>
      </main>
    );
  }

  return (
    <div className="flex justify-center">
      
      <div className="px-5 container">
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Collection: {collectionName}
        </h1>
        <Row
          xs={1}
          sm={2}
          md={2}
          lg={5}
          className="g-4 py-5"
          style={{ padding: "20px" }}
        >
          {items.map((item, idx) => (
            <Col key={idx}>
              <Card class="nftCardss">
                <Card.Img class="img-size" variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text style={{ fontSize: "11px" }}>
                    {item.description}
                  </Card.Text>
                  {/* <Card.Text style={{fontSize: "14px"}}>{item.description.slice(0, 15) + "..."}</Card.Text> */}
                  <Button
                    className="buy-nft"
                    onClick={() => buyMarketItem(item)}
                    variant="primary"
                  >
                    {ethers.utils.formatEther(item.totalPrice)} ETH
                  </Button>
                </Card.Body>
                {/* <Card.Footer>
                    
                </Card.Footer> */}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      
    </div>
  );
};

export default CollectionPage;
