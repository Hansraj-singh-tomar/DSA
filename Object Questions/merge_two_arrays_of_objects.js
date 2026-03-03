// Merge two Arrays of Objects 

let array1 = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
let array2 = [{ id: 1, age: 25 }, { id: 2, age: 30 }];

let map = {}

for (let elm of array1) {
    map[elm.id] = elm
}

// console.log(map); // { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } }


let mergedArr = array2.map((item) => {
    return { ...item, ...map[item.id] }
})

console.log(mergedArr);  // [{id: 1, name: 'Alice', age: 25}, {id: 2, name: 'Bob', age: 30}]

// -----------------------------------------------------------------

let arr1 = [{id: 1, name: "john"}, {id: 2, name: "doe"}, {id: 3, name: "bob"}]
let arr2 = [{id: 2, age: 25}, {id: 1, age: 25}]

let map2 = {}

for(let elm of arr1){
    map2[elm.id] = elm
}

console.log(map2)

for(let elm of arr2){
    map2[elm.id] = {...elm, ...map2[elm.id]} 
}

console.log(map2) 
// {
//     '1': { id: 1, age: 25, name: 'john' },
//     '2': { id: 2, age: 25, name: 'doe' },
//     '3': { id: 3, name: 'bob' }
// }

// -------------------------------------------------Approach 2-------------------------------------------------

// let obj = {id: 1, name: "hansraj"}
// let obj2 = {id: 1, age: 24}

// let ans = {...obj, ...obj2}
// console.log(ans) // {id: 1, name: "hansraj", age: 24}


//   ----------------------Using the Map Object---------------------


// let arr1 = [{id: 1, name: "john"}, {id: 2, name: "doe"}, {id: 3, name: "bob"}]
// let arr2 = [{id: 2, age: 25}, {id: 1, age: 25}]

// let map = new Map()

// for(let elm of arr1){
//     map.set(elm.id, {...elm})
// }

// for(let elm of arr2){
//     map.set(elm.id, { ...elm, ...map.get(elm.id) })
// }

// console.log(map.keys()) // [Map Iterator] { 1, 2, 3 }
// console.log(map.values()) 
// // [Map Iterator] {
// //   { id: 1, age: 25, name: 'john' },
// //   { id: 2, age: 25, name: 'doe' },
// //   { id: 3, name: 'bob' }
// // }
// console.log(Array.from(map.values()))
// // [
// //   { id: 1, age: 25, name: 'john' },
// //   { id: 2, age: 25, name: 'doe' },
// //   { id: 3, name: 'bob' }
// // ]
// console.log(new Array(3).fill("demo")) // [ 'demo', 'demo', 'demo' ]
// console.log(Array.from([
//   { id: 1, age: 25, name: 'john' },
//   { id: 2, age: 25, name: 'doe' },
//   { id: 3, name: 'bob' }
// ]))
// // [
// //   { id: 1, age: 25, name: 'john' },
// //   { id: 2, age: 25, name: 'doe' },
// //   { id: 3, name: 'bob' }
// // ]
// console.log(Array.from(map.keys())) // [ 1, 2, 3 ]