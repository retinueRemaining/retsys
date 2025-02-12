const API_KEY = "ERy4dQT0YnX3Uf6HNRtTVhfh7grNdQTl0Fj6xoqKkQ/xB5ahShGsIXON8iqT5JmQ"; // Replace with your SimplyPlural API Key
const SYSTEM_ID = "0LBrn48myHbvBJwXzzxOwF9lw492"; // Replace with your system ID

// Create WebSocket connection
const websocket = new WebSocket('wss://api.apparyllis.com/v1/socket');

// Handle WebSocket open event (authentication)
websocket.onopen = function() {
    console.log("WebSocket connection established");

    // Send authentication message
    const authMessage = {
        op: 'authenticate',
        token: API_KEY
    };
    websocket.send(JSON.stringify(authMessage)); // Send authentication message
};

// Handle incoming WebSocket messages
websocket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log("WebSocket message received:", data);

    // You can add more WebSocket event handling here
};

// Function to fetch the current fronter from the API
async function fetchFronter() {
    if (!SYSTEM_ID) {
        console.error("SYSTEM_ID not set yet.");
        return; // Prevent running before SYSTEM_ID is set
    }

    try {
        // Fetch the current fronter data from SimplyPlural API
        const response = await fetch(`https://api.apparyllis.com/v1/systems/${SYSTEM_ID}/fronters`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`, // Authorization header with API key
                'Accept': 'application/json' // Accept header for JSON response
            }
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        // Parse the response JSON
        const data = await response.json();
        console.log("Received data:", data);

        // Extract the name of the current fronter (if any)
        const fronterName = data.members.length ? data.members[0].name : "No one fronting";
        document.getElementById("fronter").textContent = fronterName; // Display the fronter's name in the HTML element
    } catch (error) {
        console.error("Error fetching fronter:", error);
        document.getElementById("fronter").textContent = "Error loading data"; // Display error message
    }
}

// Fetch the current fronter when the page loads
fetchFronter();
