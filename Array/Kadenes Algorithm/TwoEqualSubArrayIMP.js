// from Coder Army
// Q. Divide array in 2 SubArray with equal sum

// Brute Force - TimeComplexity(O(n^2))
function twoEqualSubArr(arr, n) {
    for (let i = 0; i < n; i++) {
        let sum1 = 0;
        let sum2 = 0;
        let j;
        let k;

        for (j = 0; j <= i; j++) {
            sum1 += arr[j];
        }

        for (k = i + 1; k < n; k++) {
            sum2 += arr[k];
        }

        if (sum1 == sum2) {
            return true;
            // return [arr.slice(0, j), arr.slice(i + 1, k)];
        }
    }
    return false;
}

let arr = [3, 4, -2, 5, 8, 20, -10, 8];
console.log(twoEqualSubArr(arr, arr.length)); // true
// console.log(twoEqualSubArr(arr, arr.length)); // [[3, 4, -2, 5, 8], [20, -10, 8]]

// ----------------------------------------------------------------------------------------------

// Another method - Time complexity(O(n))
function twoEqualSubArr(arr, n) {
    let totalSum = 0;
    for (let i = 0; i < arr.length; i++) {
        totalSum += arr[i];
    }

    let prefixSum = 0;
    for (let j = 0; j < arr.length - 1; j++) {
        prefixSum += arr[j];

        if (totalSum - prefixSum == prefixSum) {
            // return true;
            return [arr.slice(0, j + 1), arr.slice(j + 1)]
        }
    }

    return false;
}

let arr = [3, 4, -2, 5, 8, 20, -10, 8];
let n = arr.length;
console.log(twoEqualSubArr(arr, n)); // true
console.log(twoEqualSubArr(arr, n)); // [[3, 4, -2, 5, 8], [20, -10, 8]]