function isEmpty(obj) {
    // Check if the input is an object
    if (typeof obj === 'object' && obj !== null) {
        // If it's an object, check if it has any keys
        return Object.keys(obj).length === 0;
    } else if (Array.isArray(obj)) {
        // If it's an array, check if it has any elements
        return obj.length === 0;
    } else {
        // If it's neither an object nor an array, it's considered not empty
        return false;
    }
}

// Example usage:
console.log(isEmpty({})); // Output: true (empty object)
console.log(isEmpty([])); // Output: true (empty array)
console.log(isEmpty({ key: 'value' })); // Output: false (non-empty object)
console.log(isEmpty([1, 2, 3])); // Output: false (non-empty array)
console.log(isEmpty(null)); // Output: false (not an object or array)
console.log(isEmpty(42)); // Output: false (not an object or array)
