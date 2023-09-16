import React from "react";
import { Row, Col, Button, Container, Card } from "react-bootstrap";
import block from "./block.jpg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    // <div>
    //   <div className="head">
    //     <h3>
    //       Welcome to the <span className="headspan">Block</span> Marketplace
    //     </h3>
    //   </div>

    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       padding: "10px",
    //       height: "100vh",
    //     }}
    //   >
    //     <Row
    //       className="g-4 py-5"
    //       style={{
    //         justifyContent: "center",
    //         width: "100%",
    //         maxWidth: "1200px",
    //       }}
    //     >
    //       <Col
    //         xs={12}
    //         md={6}
    //         lg={3}
    //         style={{
    //           display: "flex",
    //           flexDirection: "column",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <div
    //           style={{
    //             maxWidth: "400px",
    //             marginBottom: "40px",
    //             textAlign: "center",
    //           }}
    //         >
    // <h1>
    //   Unlock the world of <span className="headspan">Block</span>: Rent
    //   or own captivating NFTs, tailored to inspire your digital journey.
    // </h1>
    //           <Link to={`/home`}>
    //             <Button className="startMinting">Start Minting</Button>
    //           </Link>
    //         </div>
    //       </Col>
    //       <Col
    //         xs={12}
    //         md={6}
    //         lg={3}
    //         style={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <div
    //           className="landingcontainer"
    //           style={{ width: "250px", height: "auto" }}
    //         >
    //           <div className="landingcard">
    //             <div
    //               className="landingcard-img"
    //               style={{ width: "100%", paddingBottom: "100%" }}
    //             >
    //               <img
    //                 className="landingcard-img__img"
    //                 alt=""
    //                 src={block}
    //                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
    //               />
    //             </div>
    //             <div className="landingcard-content">
    //               <h3 className="landingcard-content__title">
    //                 The Block Collection
    //               </h3>
    // <p className="landingcard-conter__text">
    //   A unique collection made only for the Block Marketplace
    // </p>
    //             </div>
    //           </div>
    //         </div>
    //       </Col>
    //     </Row>
    //   </div>
    // </div>
    <div className="flex justify-center">
      <div className="px-5 container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontWeight: "600" }}>
            Welcome To the <span className="headspan">Block</span> Marketplace
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
            <h1>
              Unlock the world of <span className="headspan">Block</span>: Rent
              or own captivating NFTs, tailored to inspire your digital journey.
            </h1>
            <Link to={`/home`}>
              <Button
                className="minting-btn"
                // style={{
                
                // }}
              >
                Start Minting
              </Button>
            </Link>
          </div>
          <div>
            <Card
              style={{ width: "225px", padding: "0px", borderRadius: "30px" }}
            >
              <Card.Img
                style={{ borderRadius: "20px" }}
                class="img-size"
                variant="top"
                src={block}
              />
              {/* <Card.Body>
            <Card.Title style={{fontWeight: "600"}}>The Block</Card.Title>
              <p>
                A unique collection made only for the Block Marketplace
              </p>
            </Card.Body> */}
            </Card>
          </div>
          {/* </Col> */}
        </Row>
      </div>
    </div>
  );
};

export default LandingPage;
