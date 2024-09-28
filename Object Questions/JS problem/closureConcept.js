
function createCounter() {
    let count = 0;

    function inner() {
        count++;
        return count;
    }

    inner.reset = () => count = 0;

    return inner;
}

const count = createCounter();

console.log(count()); // 1
console.log(count()); // 2
console.log(count()); // 3

console.log(count.reset());

console.log(count()); // 1
console.log(count()); // 2
console.log(count()); // 3

// ---------------------------------------------------------

// Using IIFE
const counter = (() => {
    let count = 1;
    return () => count++;
})();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3