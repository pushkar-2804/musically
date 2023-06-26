import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { menuItems } from "../../constants";
import KeyCloakService from "../../security/KeyCloakService";
import { useState } from "react";

function NavModal() {
  const logout = () => {
    KeyCloakService.CallLogout();
  };
  const [expanded, setExpanded] = useState(false);

  const handleNavToggle = () => {
    setExpanded(!expanded);
  };
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      expanded={expanded}
      className="p-2 navbar__mobile"
    >
      <Navbar.Brand href="#home">Musically</Navbar.Brand>
      <Navbar.Toggle
        onClick={handleNavToggle}
        aria-controls="basic-navbar-nav"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {menuItems?.map((item, index) => {
            return (
              <Nav.Link href={item.route} key={index}>
                {item.name}
              </Nav.Link>
            );
          })}
        </Nav>
        <Nav>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavModal;
