// Normalize data in objects

let list = [
    { name: "A", age: 22 },
    { name: "B", age: 22 },
    { name: "C", age: 23 },
]

let hash = {};

for (let elm of list) {
    if (hash[elm.age]) {
        hash[elm.age].push(elm.name);
    } else {
        hash[elm.age] = [elm.name]
    }
}

console.log(hash); // {"22": ["A", "B"], "23": ["C"]}
