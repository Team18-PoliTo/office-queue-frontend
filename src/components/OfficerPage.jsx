import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { NavbarTextContext } from "../App";
import { Container, Button, Card } from "react-bootstrap";
import API from "../API/API.mjs";
import "./Style/OfficerPage.css";

function OfficerPage() {
  const { officerId } = useParams();
  const { setNavbarText } = useContext(NavbarTextContext);

  useEffect(() => {
    setNavbarText(`Officer ${officerId} board`);
  }, [setNavbarText, officerId]);

  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callNextCustomer = async () => {
    try {
      setLoading(true);

      const nextCustomer = await API.callNextCustomer(officerId);

      if (nextCustomer) {
        setCurrentCustomer(`${nextCustomer.serviceName}${nextCustomer.id}`);
        setError(null);
      } else {
        setCurrentCustomer(null);
        setError(true);
      }
    } catch (err) {
      console.error("Error calling next customer:", err);
      setCurrentCustomer(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="officer-page-container">
      <Card className="card-rectangle">
        {currentCustomer ? (
          <>
            <div className="card-left">
              <strong>You're serving customer n°</strong>
            </div>
            <div className="card-right">{currentCustomer}</div>
          </>
        ) : (
          <div className="card-left">
            <strong>
              {error
                ? "No customers in queue"
                : "Press the button to call the first customer"}
            </strong>
          </div>
        )}
      </Card>

      <Button
        className="call-next-button"
        onClick={callNextCustomer}
        disabled={loading}
      >
        <strong>{loading ? "Calling..." : "Call next"}</strong>
      </Button>
    </Container>
  );
}

export default OfficerPage;
