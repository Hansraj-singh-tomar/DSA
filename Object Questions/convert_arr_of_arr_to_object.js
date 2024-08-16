// Convert Array to Object

let pairs = [['name', 'Alice'], ['age', 25], ['city', 'wonderland']];

let obj = pairs.reduce((acc, [key, value]) => {
    acc[key] = value;

    return acc;
}, {});

console.log(obj); // {name: 'Alice', age: 25, city: 'wonderland'}

// ----------------------------------------------------------------------------------

// using reduce method 

let pairs2 = [['name', 'Alice'], ['age', 25], ['city', 'wonderland']];

let hash = {};

for (let [name, age] of pairs2) {
    hash[name] = age;
}

console.log(hash); // {name: 'Alice', age: 25, city: 'wonderland'}

