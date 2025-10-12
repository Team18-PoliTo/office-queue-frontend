import { useContext, useState, useEffect } from "react";
import { NavbarTextContext } from "../App";
import { Container, Button, Card } from "react-bootstrap";
import API from "../API/API.mjs";

function OfficerPage() {

    const { setNavbarText } = useContext(NavbarTextContext);
    useEffect(() => {
      setNavbarText("Officer board");
    }, []);

    const [currentCustomer, setCurrentCustomer] = useState(null);

    const callNextCustomer = async () => {
      setCurrentCustomer("A18"); // Example customer number
      //const nextCustomer = await API.callNextCustomer();
    }

  return (
    <Container className="officer-page-container">
      <Card className="card-rectangle">
        { currentCustomer ?
          <>
            <div className="card-left">You're serving customer n°</div>
            <div className="card-right">{currentCustomer}</div>
          </>
          :
          <div className="card-left">No customer is being served</div>
        }
      </Card>
      <Button className="call-next-button" onClick={callNextCustomer}>Call next</Button>
    </Container>
  );
}

export default OfficerPage;