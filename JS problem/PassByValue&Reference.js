
// Example of Pass by Value with Primitive Data Types (like strings)
function tryToModifyString(str) {
  str = "Goodbye"; // यहाँ str की copy को बदला गया है
  console.log("Function ke andar:", str); // Output: Function ke andar: Goodbye
}

let message = "Hello";
tryToModifyString(message);
console.log("Function ke bahar:", message); // Output: Function ke bahar: Hello

// ------------------------------------------------------------

// Example of Pass by Reference with Objects

// Solution 1: Modifying the properties of the object
// To use Primitive Data Types by Reference, we can wrap them in an object
function tryToModifyStringInObject(obj) {
  obj.text = "Goodbye"; // यहाँ obj के अंदर text property को बदला गया है
  console.log("Function ke andar:", obj.text); // Output: Function ke andar: Goodbye
}

let messageObj = { text: "Hello" };
console.log("Function ke bahar:", messageObj.text); // Output: Function call se pehle: Hello
tryToModifyStringInObject(messageObj);
console.log("Function ke bahar:", messageObj.text); // Output: Function ke bahar: Goodbye


// Solution 2
function modifyAndReturnString(str) {
  // कुछ operations करके नई string बनाएं
  let newStr = str + " World";
  return newStr;
}

let greeting = "Hello";
// Function से return हुई value को greeting में वापस store करें
greeting = modifyAndReturnString(greeting);

console.log(greeting); // Output: Hello World