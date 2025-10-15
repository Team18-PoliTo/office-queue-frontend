const SERVER_URL = ""; // Use empty string to use proxy configured in vite.config.js

const callNextCustomer = async () => {
  const response = await fetch(SERVER_URL + "/api/officer/next-customer", {
    method: "POST", // Depends on API design, could be GET or POST
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (response.ok) {
    const customer = await response.json();
    return customer; // Assuming the API returns the next customer ticket number as a string
  }
};

const getServices = async () => {
  try {
    const response = await fetch(SERVER_URL + "/api/services", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      const services = await response.json();
      return services; // Assuming the API returns an array of services
    } else {
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

const postTicket = async (serviceId) => {
  try {
    const response = await fetch(SERVER_URL + "/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ serviceId }),
    });
    if (response.ok) {
      const ticket = await response.json();
      return ticket; // Assuming the API returns the created ticket
    } else {
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error posting ticket:", error);
    throw error;
  }
};

const API = { callNextCustomer, getServices, postTicket };

export default API;
