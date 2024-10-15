async function fetchWithRetry(url, options = {}, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response; // Return response if successful
        } catch (error) {
            if (attempt === maxRetries) {
                throw error; // Throw the error if it's the last attempt
            }
            console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay)); // Wait for the delay before retrying
        }
    }
}

// Usage example
fetchWithRetry('https://api.example.com/data', { method: 'GET' }, 5, 2000)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Final error:', error));


// -------------------------------------------------------------------------------------------------------


// optimized solution
async function fetchWithRetry(url, options = {}, maxRetries = 3, delay = 1000) {
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return response; // Return successful response
            throw new Error(`HTTP error! status: ${response.status}`);
        } catch (error) {
            attempt++;
            if (attempt >= maxRetries) throw error; // Throw error after max retries
            await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
        }
    }
}

// Usage
fetchWithRetry('https://api.example.com/data', { method: 'GET' }, 5, 2000)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Final error:', error));
