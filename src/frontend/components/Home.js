import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const loadMarketplaceItems = async () => {
    const itemCount = await marketplace.itemCount();
    let items = [];

    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);

      if (!item.sold) {
        const uri = await nft.tokenURI(item.tokenId);
        const response = await fetch(uri);
        const metadata = await response.json();
        const totalPrice = await marketplace.getTotalPrice(item.itemId);

        items.push({
          totalPrice,
          collectionName: metadata.collectionName,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          createdAt: item.createdAt, // Add createdAt property to capture the item creation timestamp
        });
      }
    }

    // Sort items by createdAt timestamp in descending order (latest first)
    items.sort((a, b) => b.createdAt - a.createdAt);

    setLoading(false);
    setItems(items);
  };

  useEffect(() => {
    const loadCollections = async () => {
      await loadMarketplaceItems();
    };

    loadCollections();
  }, []);

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

  if (items.length === 0) {
    return (
      <h2
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        No Marketplace Items
      </h2>
    );
  }

  const renderCollectionCards = () => {
    const collectionMap = {};
    items.forEach((item) => {
      if (!collectionMap[item.collectionName]) {
        collectionMap[item.collectionName] = [item];
      } else {
        collectionMap[item.collectionName].push(item);
      }
    });

    return Object.entries(collectionMap).map(
      ([collectionName, collectionItems]) => {
        const firstItem = collectionItems[0];

        return (
          <div className="flex justify-center" key={collectionName}>
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  class="img-size"
                  src={firstItem.image}
                />
                <Card.Body>
                  <Card.Title>{collectionName}</Card.Title>
                  <Link to={`/collection/${collectionName}`}>
                    <Button className="buy-nft" variant="primary">
                      View Collection
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </div>
        );
      }
    );
  };

  return (
    <div className="flex justify-center">
      <div className="px-5 container">
        <Row xs={1} md={2} lg={4} className="g-4 py-5">
          {renderCollectionCards()}
        </Row>
      </div>
    </div>
  );
};

export default Home;
