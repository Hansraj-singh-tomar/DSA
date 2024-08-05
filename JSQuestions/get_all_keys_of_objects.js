// Q. Get all keys of objects
// let objArray = [{ a: 1, b: 2 }, { b: 3, c: 4 }, { d: 5 }];
// Expected output: ["a", "b", "c", "d"]


let objArray = [{ a: 1, b: 2 }, { b: 3, c: 4 }, { d: 5 }];
let uniqueKey = new Set();

for (let elm of objArray) {
    for (let key in elm) {
        uniqueKey.add(key);
    }
}

console.log(uniqueKey); // Set(4) {"a", "b", "c", "d"}

let ans = Array.from(uniqueKey);

console.log(ans); // ["a", "b", "c", "d"]


// ----------------------------------------------------------------------------------


let objArr = [{ a: 1, b: 2 }, { b: 3, c: 4 }, { d: 5 }];
let hash = [];

for (let elm of objArr) {
    for (let key in elm) {
        hash.push(key)
    }
}

console.log(hash); // ["a", "b", "c", "d"]
