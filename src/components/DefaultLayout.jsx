import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import NavHeader from "./NavHeader";
import Footer from "./Footer";

function DefaultLayout() {
  return (
    <>
      <NavHeader />
      <Container fluid className="mt-3" style={{ paddingBottom: "80px" }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default DefaultLayout;
