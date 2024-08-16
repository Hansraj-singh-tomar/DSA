let mixedArray = [0, "hello", false, 42, "", null, "world", undefined, NaN];

let filteredArray = [];

for (let i = 0; i < mixedArray.length; i++) {
    if (mixedArray[i]) {
        filteredArray.push(mixedArray[i])
    }
}

console.log(filteredArray); // ["hello", 42, "world"]

// ------------------------------------------------------------------------------

// second method 
// using filter method

let mixedArray1 = [0, "hello", false, 42, "", null, "world", undefined, NaN];

let filteredArray1 = mixedArray.filter(Boolean)

console.log(filteredArray1);
