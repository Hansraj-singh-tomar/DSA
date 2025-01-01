// Array to keep track of all active timeout IDs
const timeoutIds = [];

// Override the global setTimeout function
const originalSetTimeout = window.setTimeout;
window.setTimeout = function (callback, delay, ...args) {
    const id = originalSetTimeout(callback, delay, ...args);
    timeoutIds.push(id);
    return id;
};

// Function to clear all timeouts
function clearAllTimeout() {
    while (timeoutIds.length) {
        const id = timeoutIds.pop();
        clearTimeout(id);
    }
}

// Example usage
setTimeout(() => console.log("Timeout 1"), 1000);
setTimeout(() => console.log("Timeout 2"), 2000);
setTimeout(() => console.log("Timeout 3"), 3000);

// Clear all timeouts after 1500ms
setTimeout(() => {
    clearAllTimeout();
    console.log("Cleared all timeouts");
}, 1500);
