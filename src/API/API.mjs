const SERVER_URL = ""; // Use empty string to use proxy configured in vite.config.js

const callNextCustomer = async (counterId) => {
  try {
    const response = await fetch(
      SERVER_URL + `/api/counter/${counterId}/next`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-type": "officer",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      const text = await response.text();
      if (text.trim() === "") {
        return null;
      }
      try {
        return JSON.parse(text); 
      } catch (jsonError) {
        console.error("Invalid JSON response:", text);
        return null;
      }
    } else {
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error calling next customer:", error);
    throw error;
  }
};

const getServices = async () => {
  try {
    const response = await fetch(SERVER_URL + "/api/services", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user-type": "customer",
      },
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
      headers: {
        "Content-Type": "application/json",
        "user-type": "customer",
      },
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
