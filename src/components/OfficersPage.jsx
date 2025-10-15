import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card } from "react-bootstrap";
import { NavbarTextContext } from "../App";
import "./Style/OfficersPage.css";

function OfficersPage() {
  const navigate = useNavigate();
  const officers = [1, 2, 3];
  const { setNavbarText } = useContext(NavbarTextContext);

  useEffect(() => {
    setNavbarText("Choose your officer");
  }, [setNavbarText]);

  const handleOfficerClick = (officerId) => {
    navigate(`/officer/${officerId}`);
  };

  return (
    <div className="officers-page-container">
      {officers.map((officer) => (
        <Card
          className="btn officers-card"
          key={officer}
          onClick={() => handleOfficerClick(officer)}
          style={{
            cursor: "pointer",
          }}
        >
          <i className="bi bi-briefcase-fill officers-icon"></i>
          <strong>Officer {officer}</strong>
        </Card>
      ))}
    </div>
  );
}

export default OfficersPage;
