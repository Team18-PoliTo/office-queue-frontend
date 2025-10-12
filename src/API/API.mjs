const SERVER_URL = "http://localhost:3001"; // Adjust the server URL as needed

const callNextCustomer = async() => {
    const response = await fetch(SERVER_URL + '/api/officer/next-customer', {
        method: 'POST', // Depends on API design, could be GET or POST
        headers: {'Content-Type': 'application/json',},
        credentials: 'include'
    });
    if (response.ok) {
      const customer = await response.json();
      return customer; // Assuming the API returns the next cusomer ticket number as a string
    }
}

const API = { callNextCustomer };

export default API;