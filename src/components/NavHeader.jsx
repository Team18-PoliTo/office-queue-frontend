import { Container, Navbar, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router';
import { useContext } from "react";
import { NavbarTextContext } from "../App";
import './Style/NavHeader.css'

function NavHeader() {
  const { navbarText } = useContext(NavbarTextContext);

  const location = useLocation();

  return(
    <Navbar className="navbar-custom mx-3">
      <Container>
        <Navbar.Brand><strong>{navbarText}</strong></Navbar.Brand>
        { location.pathname !== "/" &&
          <Link className='btn home-button' to="/"><i className='bi bi-house'> </i></Link>
        }
      </Container>
    </Navbar>
  );
}

export default NavHeader;