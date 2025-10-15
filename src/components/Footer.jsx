import { Container } from "react-bootstrap";
import "./Style/Footer.css";

function Footer() {
  return (
    <footer className="footer-custom mx-3">
      <Container>
        <div className="footer-text">
          <strong>
            © 2025 Office Queue Management System - Developed by Team 18
          </strong>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
