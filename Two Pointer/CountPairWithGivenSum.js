// Q. Count pair with given sum
// Q. Zero sum subarray
// we can solve this problem using sliding window


// arr = [1,5,7,-1], sum = 6
// output is - 2
// pairs are - (1,5) (7,-1)



// 1. Brute force 

// Zero sum subArray - Total number of subarray jinka sum zero hai

// Time complexity - o(n^2)
function getPairsCount(arr, n, sum) {
    let count = 0;

    for (let i = 0; i < n; i++) {
        let total = 0;
        for (let j = i; j < n; j++) {
            total += arr[j];
            if (total == sum) {
                count++;
            }
        }
    }

    return count;
}


// let arr = [1, 5, 7, -1, 5];
// let sum = 6;
// let n = arr.length;
// console.log(getPairsCount(arr, n, sum)); // 2


let arr = [6, -1, -3, 4, -2, 2, 4, 6, -12, -2]
let n = arr.length;
let sum = 0;
console.log(getPairsCount(arr, n, sum)); // 5
