// sum of n numbers using recursion

function printSumOfN(i, sum) {
    if (i < 1) {
        console.log(sum);
        return;
    }
    printSumOfN(i - 1, sum + i);
}


let n = 5;
let sum = 0;
printSumOfN(n, sum) // 15

// --------------------------------------------

// T(c) - O(n)
function sumOfN(n) {
    if (n == 0) return 0; // if i won't return anything then it will return undefined + 15 = NAN

    return n + sumOfN(n - 1);
}

console.log(sumOfN(5)); // 15

// Note - in case of product you have to return 1 instead of 0