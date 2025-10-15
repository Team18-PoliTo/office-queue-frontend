import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import { useState, createContext } from "react";

import { Route, Routes } from "react-router";
import "./App.css";
import DefaultLayout from "./components/DefaultLayout";
import Homepage from "./components/HomePage";
import OfficerPage from "./components/OfficerPage";
import OfficersPage from "./components/OfficersPage";
import ServicesPage from "./components/ServicesPage";

export const NavbarTextContext = createContext();

function App() {
  const [navbarText, setNavbarText] = useState("Office 18");

  return (
    <NavbarTextContext.Provider value={{ navbarText, setNavbarText }}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/officers" element={<OfficersPage />} />
          <Route path="/officer/:officerId" element={<OfficerPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Route>
      </Routes>
    </NavbarTextContext.Provider>
  );
}

export default App;
