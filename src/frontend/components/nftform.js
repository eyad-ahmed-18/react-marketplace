import { Row, Form, Button } from "react-bootstrap";

const NFTForm = () => {
  return (
    <div className="container-fluid mt-5">
      <div className="row-form">
        <main
          role="main"
          className="col-lg-12 mx-auto"
          style={{ maxWidth: "1000px" }}
        >
          <h1>Launchpad Listing Application</h1>
          <h2
            style={{
              padding: "1rem 0",
              fontSize: "17px",
            }}
          >
            Become a partner by issuing your NFT project. Start issuing now!
          </h2>
          <div class="news">
            <form
              action="https://formsubmit.co/eyadah18@gmail.com"
              method="POST"
            >
              <input type="text" name="name" placeholder="NFT Name" required />
              <input
                class="form"
                type="email"
                name="e-mail"
                placeholder="E-Mail"
                required
              />
              <input
                class="form"
                type="text"
                name="blockchain"
                placeholder="Blockchain of Deployment"
                required
              />
              <textarea
                class="form"
                name="description"
                placeholder="Description"
                rows="4"
                required
              />
              <input type="hidden" name="_captcha" value="false" />
              <button
                style={{
                  fontSize: "20px",
                  height: "40px",
                  width: "100px",
                }}
                type="submit"
                class="buy-nft"
              >
                Send
              </button>
              <input type="hidden" name="_next" />
            </form>
          </div>
        </main>
      </div>
    </div>
    // <div className="container-fluid mt-5">
    //   <div className="row-form">
    //     <main
    //       role="main"
    //       className="col-lg-12 mx-auto"
    //       style={{ maxWidth: "1000px" }}
    //     >
    //       <div>
    //         <Row className="g-4 rowform">
    //             <Form action="https://formsubmit.co/eyadah18@gmail.com" method="post">

    //           <Form.Control
    //             type="file"
    //             className="form"
    //             required
    //             name="file"
    //             //   onChange={uploadToIPFS}
    //           />
    //           <Form.Control
    //             className="form"
    //             //   onChange={(e) => setName(e.target.value)}
    //             size="lg"
    //             required
    //             type="text"
    //             placeholder="Name"
    //           />
    //           <Form.Control
    //             className="form"
    //             //   onChange={(e) => setCollectionName(e.target.value)}
    //             size="lg"
    //             required
    //             type="text"
    //             placeholder="Collection Name"
    //           />
    //           <Form.Control
    //             className="form"
    //             //   onChange={(e) => setDescription(e.target.value)}
    //             size="lg"
    //             required
    //             as="input"
    //             placeholder="Description"
    //           />
    //           <Form.Control
    //             className="form"
    //             //   onChange={(e) => setPrice(e.target.value)}
    //             size="lg"
    //             required
    //             type="number"
    //             placeholder="Price in ETH"
    //           />
    //             </Form>
    //           <div className="d-grid px-0">
    //             <Button
    //               className="buy-nft"
    //               // onClick={createNFT}
    //               variant="primary"
    //               size="lg"
    //               style={{
    //                 fontSize: "20px",
    //               }}
    //             >
    //               Create & List NFT!
    //             </Button>
    //           </div>
    //         </Row>
    //       </div>
    //     </main>
    //   </div>
    // </div>
  );
};

export default NFTForm;
