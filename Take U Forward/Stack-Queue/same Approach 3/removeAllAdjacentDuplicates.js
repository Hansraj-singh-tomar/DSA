function removeAllAdjacentDuplicates(str) {
    let stack = [];

    for (let i = 0; i < str.length; i++) {
        if (stack.length > 0 && stack[stack.length - 1] === str[i]) {
            stack.pop(); // Remove the last character from the stack if it's the same as the current character
        } else {
            stack.push(str[i]); // Add the current character to the stack
        }
    }

    return stack.join(''); // Join the stack elements into a string
}

console.log(removeAllAdjacentDuplicates("geeksforgeeks")); // Output: "gksforgks"
console.log(removeAllAdjacentDuplicates("abbaca")); // Output: "ca"
