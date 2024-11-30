let arr1 = [1, '2', 'three', 4, '5x'];
let sum1 = 0;

console.log(isNaN('23')); // false
console.log(isNaN('three')); // true



arr1.forEach((elm) => {
    if (typeof elm === 'number' || !isNaN(elm)) {
        sum += elm;
    }
});

console.log(sum); // Expected output is 7

// -------------------------------------------------

// another way
let arr = [10, 'hello', 20, '30', 'demo'];
let sum = 0;
arr.map((elm) => {
    if (typeof elm == "number") {
        sum += elm;
    } else if (typeof elm == 'string' && !isNaN(elm)) {
        sum += Number(elm);
    }
})

console.log(sum); // 60
