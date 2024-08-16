// Merge two Arrays of Objects 

let array1 = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
let array2 = [{ id: 1, age: 25 }, { id: 2, age: 30 }];

let map = {}

for (let elm of array1) {
    map[elm.id] = elm
}

// console.log(map);


let mergedArr = array1.map((item) => {
    return { ...item, ...map[item.id] }
})

console.log(mergedArr);  // [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}]



