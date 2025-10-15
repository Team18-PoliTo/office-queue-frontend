import { Link } from "react-router";
import { use, useContext, useEffect } from "react";
import { NavbarTextContext } from "../App";
import './Style/HomePage.css'

function Homepage() {

  const { setNavbarText } = useContext(NavbarTextContext);
  useEffect(() => {
    setNavbarText("Office 18");
  }, []);

  return (
    <div className="homepage-container">
      <Link to="/services" className="btn homepage-button">
          <i className="bi bi-person-fill icon"></i>
          Customer
       </Link>
      <Link to="/officer" className="btn homepage-button">
          <i className="bi bi-briefcase-fill icon"></i>
          Officer
       </Link>
    </div>
  );
}

export default Homepage;