// Approach 1: Aborting Previous Requests with AbortController
// You can use the AbortController API to cancel any ongoing requests when the user continues typing.

// Example with AbortController:

let controller = null;

async function fetchUserData(userId) {
    // Abort the previous request if there's one
    if (controller) {
        controller.abort();
    }

    // Create a new controller for the current request
    controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`, { signal });
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        console.log("Fetched user data:", data);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log(`Request for user ID ${userId} was aborted`);
        } else {
            console.error('Fetch error:', error);
        }
    }
}

// Simulate onChange handler for the search bar
function onSearchChange(event) {
    const userId = event.target.value;
    fetchUserData(userId); // Fetch data on ID change
}

// Example input change simulation
const inputEvent = { target: { value: '1234' } };
onSearchChange(inputEvent);

// ---------------------------------------------------------------------

// Approach 2: Tracking the Latest Request
// Alternatively, you can track the latest request manually and ignore any responses from previous, outdated requests.

// Note :- This pattern is often used in search suggestions, auto-complete inputs, and live filtering 
// where multiple requests might be triggered in quick succession due to user input.

// Example by Tracking the Latest Request:
let latestRequestId = 0;

async function fetchUserData(userId) {
    const currentRequestId = ++latestRequestId; // Increment and store request ID

    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();

        // Check if this is the latest request before processing
        if (currentRequestId === latestRequestId) {
            console.log("Fetched user data:", data); // Process only the latest request
        } else {
            console.log(`Ignoring stale response for user ID ${userId}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Simulate onChange handler for the search bar
function onSearchChange(event) {
    const userId = event.target.value;
    fetchUserData(userId); // Fetch data on ID change
}

// Example input change simulation
const inputEvent = { target: { value: '1234' } };
onSearchChange(inputEvent);
