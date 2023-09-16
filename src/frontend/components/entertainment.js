import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const Entertainment = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const loadCollections = async () => {
    const itemCount = await marketplace.itemCount();
    const collectionsMap = new Map();

    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold && item.category === "Entertainment") {
        const tokenUri = await nft.tokenURI(item.tokenId);
        const response = await fetch(tokenUri);
        const metadata = await response.json();

        if (!collectionsMap.has(metadata.collectionName)) {
          collectionsMap.set(metadata.collectionName, []);
        }

        const collectionItems = collectionsMap.get(metadata.collectionName);
        collectionItems.push({
          totalPrice: await marketplace.getTotalPrice(item.itemId),
          collectionName: metadata.collectionName,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }

    const collectionsArray = Array.from(collectionsMap, ([name, items]) => ({
      name,
      items,
    }));
    setCollections(collectionsArray);
    setLoading(false);
  };

  useEffect(() => {
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

  if (collections.length === 0) {
    return (
      <h2
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        No Marketplace Items
      </h2>
    );
  }

  const renderCollectionCards = () => {
    return collections.map((collection) => {
      const firstItem = collection.items[0];

      return (
        <div className="flex justify-center" key={collection.name}>
          <Col>
            <Card>
              <Card.Img
                variant="top"
                className="img-size"
                src={firstItem.image}
              />
              <Card.Body>
                <Card.Title>{collection.name}</Card.Title>
                <Link to={`/collection/${collection.name}`}>
                  <Button className="buy-nft" variant="primary">
                    View Collection
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </div>
      );
    });
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

export default Entertainment;
