import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const Navigation = ({ web3Handler, account }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const location = useLocation();

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    setIsNavbarOpen(false);
  }, [location]);

  return (
    <div style={{ marginBottom: "80px" }}>
      <Navbar
        fixed="top"
        expand="lg"
        bg="dark"
        variant="dark"
        className="animate-navbar"
      >
        <Container>
          <Link to="/" className="headline">
            Block Marketplace
          </Link>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleNavbarToggle}
          />
          <Navbar.Collapse id="responsive-navbar-nav" in={isNavbarOpen}>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home" onClick={handleNavbarToggle}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/create" onClick={handleNavbarToggle}>
                Create
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/my-listed-items"
                onClick={handleNavbarToggle}
              >
                My Listed Items
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/my-purchases"
                onClick={handleNavbarToggle}
              >
                My Purchases
              </Nav.Link>
              <Nav.Link as={Link} to="/categories" onClick={handleNavbarToggle}>
                Sustainability
              </Nav.Link>
              <Nav.Link as={Link} to="/launchpad" onClick={handleNavbarToggle}>
                Launchpad
              </Nav.Link>
            </Nav>
            <Nav>
              {account ? (
                <Nav.Link
                  href={`https://etherscan.io/address/${account}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavbarToggle}
                >
                  <Button className="connect-btn" variant="outline-light">
                    {account.slice(0, 5) + "..." + account.slice(38, 42)}
                  </Button>
                </Nav.Link>
              ) : (
                <Button
                  className="connect-btn"
                  variant="outline-light"
                  onClick={() => {
                    web3Handler();
                    handleNavbarToggle(); // Close the navbar after connecting wallet
                  }}
                >
                  Connect Wallet
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;

// import { Link, useLocation } from "react-router-dom";
// import { Navbar, Nav, Button, Container } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { Web3Button, useWeb3Modal } from "@web3modal/react";
// import {useAccount, useDisconnect} from 'wagmi'

// const Navigation = ({ connectweb3, account }) => {
//   const [isNavbarOpen, setIsNavbarOpen] = useState(false);
//   const location = useLocation();
//   const { open } = useWeb3Modal();
//   const {isConnected, address} = useAccount();
//   const {disconnect} = useDisconnect();
//   const onClick = async() => {
//     if(!isConnected) {
//       disconnect()
//     } else {
//       await open()
//     }
//   }

//   const handleNavbarToggle = () => {
//     setIsNavbarOpen(!isNavbarOpen);
//   };

//   useEffect(() => {
//     setIsNavbarOpen(false);
//   }, [location]);

//   return (
//     <div style={{ marginBottom: "80px" }}>
//       <Navbar
//         fixed="top"
//         expand="lg"
//         bg="light"
//         variant="light"
//         className="animate-navbar"
//       >
//         <Container>
//           <Link to="/" className="headline">
//             Block Marketplace
//           </Link>
//           <Navbar.Toggle
//             aria-controls="responsive-navbar-nav"
//             onClick={handleNavbarToggle}
//           />
//           <Navbar.Collapse
//             id="responsive-navbar-nav"
//             in={isNavbarOpen}
//             style={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Nav className="me-auto">
//               <Nav.Link as={Link} to="/home" onClick={handleNavbarToggle}>
//                 Home
//               </Nav.Link>
//               <Nav.Link as={Link} to="/create" onClick={handleNavbarToggle}>
//                 Create
//               </Nav.Link>
//               <Nav.Link
//                 as={Link}
//                 to="/my-listed-items"
//                 onClick={handleNavbarToggle}
//               >
//                 My Listed Items
//               </Nav.Link>
//               <Nav.Link
//                 as={Link}
//                 to="/my-purchases"
//                 onClick={handleNavbarToggle}
//               >
//                 My Purchases
//               </Nav.Link>
//               <Nav.Link as={Link} to="/categories" onClick={handleNavbarToggle}>
//                 Sustainability
//               </Nav.Link>
//             </Nav>
//             <Nav>
//               {account ? (
//                 <Nav.Link
//                   href={`https://etherscan.io/address/${account}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   onClick={handleNavbarToggle}
//                 >
//                   <Button className="connect-btn" variant="outline-dark">
//                     {account.slice(0, 5) + "..." + account.slice(38, 42)}
//                   </Button>
//                 </Nav.Link>
//               ) : (
//                 <Button
//                   variant="outline-dark"
//                   className="connect-btn"
//                   onClick={onClick}
//                 >
//                   Connect Wallet
//                 </Button>
//                 // <Web3Button />
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </div>
//   );
// };

// export default Navigation;
