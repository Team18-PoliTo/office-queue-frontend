import { useContext, useState, useEffect } from "react";
import { NavbarTextContext } from "../App";
import { Container, Button, Card, Modal } from "react-bootstrap";
import API from "../API/API.mjs";
import "./Style/ServicesPage.css";

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [loading, setLoading] = useState(false);


  const { setNavbarText } = useContext(NavbarTextContext);

  useEffect(() => {
    setNavbarText("Choose your service");
  }, []);

  // Load services on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        setServicesLoading(true);
        const servicesData = await API.getServices();
        setServices(servicesData);
      } catch (error) {
        console.error("Errore nel caricamento dei servizi:", error);
      } finally {
        setServicesLoading(false);
      }
    };

    loadServices();
  }, []);

  // Timer to close the modal after showing the ticket number for 4 seconds
  useEffect(() => {
    let timer;
    if (showModal && !loading && ticketNumber) {
      timer = setTimeout(() => {
        setShowModal(false);
        setTicketNumber("");
      }, 4000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showModal, loading, ticketNumber]);

  // Handle service card click
  const handleServiceClick = async (serviceId) => {
    setLoading(true);
    try {

      // Call the API to create a ticket
      const ticket = await API.postTicket(serviceId);

      const serviceNameId = `${ticket.serviceName}${ticket.id}`;
      setTicketNumber(serviceNameId);
      setShowModal(true);

      //the timer starts AFTER the modal shows the ticket (when loading becomes false)
    } catch (error) {
      console.error("Error for the creation of the ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mostra un loading mentre i servizi vengono caricati
  if (servicesLoading) {
    return (
      <div className="service-page-container">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading services...</span>
          </div>
          <p>Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="service-page-container">
      {services.map((service) => (
        <Card
          className="btn service-card"
          key={service.id}
          onClick={() => !loading && handleServiceClick(service.id)}
          style={{
            pointerEvents: loading ? "none" : "auto",
          }}
        >
          <i className="bi bi-people service-icon"></i>
          Service {service.name}
        </Card>
      ))}

      {/*Modal for ticket display*/}
      <Modal
        show={showModal || loading}
        onHide={() => false} // Prevent closing in any way
        centered
        className="ticket-modal"
        backdrop="static" // Prevent closing by clicking outside
        keyboard={false} // Prevent closing with ESC
      >
        <Modal.Body className="ticket-modal-body">
          {loading ? (
            <div className="loading-display">
              <div
                className="spinner-border text-primary loading-spinner"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <h3 className="loading-title">Processing your request...</h3>
              <p className="loading-message">
                Please wait while we generate your ticket
              </p>
            </div>
          ) : (
            <div className="ticket-display">
              <h2 className="ticket-title">Your number is</h2>
              <div className="ticket-number">{ticketNumber}</div>
              <p className="ticket-message">Please wait your turn</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ServicesPage;
