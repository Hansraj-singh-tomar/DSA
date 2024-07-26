function lowerToUpper(str, index = 0) {
    if (index === str.length) {
        return ""; // Base case: return empty string if index reaches end
    }

    const char = str[index];
    let convertedChar;
    if (char >= 'a' && char <= 'z') {
        convertedChar = String.fromCharCode(char.charCodeAt(0) - 32); // Convert to uppercase
    } else {
        convertedChar = char; // Keep non-lowercase characters
    }

    // Modify the original string directly within the recursion (corrected error)
    str[index] = convertedChar;

    // Return the rest of the converted string using recursion
    return convertedChar + lowerToUpper(str, index + 1);
}

let str = "hello";
const result = lowerToUpper(str);
console.log(result); // Output: HELLO



// -------------------------------------------------

function toUpperCaseRecursive(str, index = 0) {
    if (index === str.length) {
        return '';
    }

    let charCode = str.charCodeAt(index);
    if (charCode >= 97 && charCode <= 122) { // 'a' to 'z'
        charCode -= 32; // Convert to uppercase
    }

    return String.fromCharCode(charCode) + toUpperCaseRecursive(str, index + 1);
}

// Example usage:
let lowerCaseString = "hello world";
let upperCaseString = toUpperCaseRecursive(lowerCaseString);
console.log(upperCaseString); // Outputs: "HELLO WORLD"