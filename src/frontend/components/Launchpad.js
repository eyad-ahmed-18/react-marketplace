import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Launchpad = () => {
  return (
    <div className="flex justify-center">
      <div className="px-5 container">
        <div
          style={{
            padding: "1rem 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontWeight: "600" }}>
            <span className="headspan">Block</span> Launchpad
          </h1>
        </div>
        <Row xs={2} md={2} lg={5} className="g-4 py-5">
          {/* <Col> */}
          <div
            style={{
              width: "500px",
              alignItems: "start",
              marginRight: "300px",
              justifyContent: "space-around",
            }}
          >
            <h1
              style={{
                marginBottom: "40px",
                fontSize: "17px",
              }}
            >
              {/* Exclusive NFT launches are available through Launchpad on the{" "}
                <span className="headspan">Block</span> Marketplace. We compile
                the most distinctive decentralized NFT initiatives available. */}
              The Block's NFT Launchpad is an empowering platform for creators
              to build and launch custom NFT projects, seamlessly integrated
              into their marketplace. It grants instant exposure to a vibrant
              community of collectors for innovative artworks and collectibles.
            </h1>
            <h1
              style={{
                marginBottom: "90px",
                fontSize: "17px",
              }}
            >
              The advanced NFT dashboard offers comprehensive tools and
              analytics, ensuring transparent and effortless project tracking
              and management.
            </h1>
          </div>
          <Link to={`/nftform`}>
            <Button
              className="buy-nft"
              style={{
                fontSize: "20px",
                paddingLeft: "20px",
                paddingRight: "20px",
                width: "180px"
              }}
            >
              Start Issuing
            </Button>
          </Link>
          {/* </Col> */}
        </Row>
      </div>
    </div>
  );
};

export default Launchpad;
