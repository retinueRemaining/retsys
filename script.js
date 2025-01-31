// script.js
const API_KEY = "ERy4dQT0YnX3Uf6HNRtTVhfh7grNdQTl0Fj6xoqKkQ/xB5ahShGsIXON8iqT5JmQ"; // Replace with your SimplyPlural API Key
let SYSTEM_ID = "0LBrn48myHbvBJwXzzxOwF9lw492"; // Will be fetched dynamically

// Function to fetch system ID
async function fetchSystemID() {
    try {
        const response = await fetch('https://api.apparyllis.com/v1/me', {
            headers: { 
                'Authorization': 'Bearer ' + API_KEY,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`HTTP Error! Status: ${response.status}`);
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        SYSTEM_ID = data.id; // Extract system ID
        console.log("SYSTEM_ID fetched:", SYSTEM_ID);
        fetchFronter(); // Fetch fronter once ID is obtained
        setInterval(fetchFronter, 30000); // Auto-update every 30 sec
    } catch (error) {
        console.error("Error fetching system ID:", error);
        document.getElementById("fronter").textContent = "Error loading data";
    }
}

// Function to fetch the current fronter
async function fetchFronter() {
    if (!SYSTEM_ID) {
        console.error("SYSTEM_ID not set yet.");
        return; // Prevent running before SYSTEM_ID is set
    }

    try {
        const response = await fetch(`https://api.apparyllis.com/systems/${SYSTEM_ID}/fronters`, {
            headers: { 
                'Authorization': 'Bearer ' + API_KEY,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`HTTP Error! Status: ${response.status}`);
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received data:", data);
        
        const fronterName = data.members.length ? data.members[0].name : "No one fronting";
        document.getElementById("fronter").textContent = fronterName;
    } catch (error) {
        console.error("Error fetching fronter:", error);
        document.getElementById("fronter").textContent = "Error loading data";
    }
}

fetchSystemID(); // Start fetching data
