// this is similar ko zeroSumArray

// Zero sum subArray - Total number of subarray jinka sum zero hai

// Time complexity - O(n^3)
function getPairsCount(arr, n, sum) {
    let count = 0;

    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            let total = 0;
            for (let k = i; k <= j; k++) {
                total += arr[k];
            }
            if (total == sum) {
                count++;
            }
        }
    }

    return count;
}

let arr = [6, -1, -3, 4, -2, 2, 4, 6, -12, -2]
let n = arr.length;
let sum = 0;
console.log(getPairsCount(arr, n, sum)); // 4


// --------------------------------------------------


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


// --------------------------------------------------------------

// from coder army
// Zero sum subArray - Total number of subarray jinka sum zero hai

// Time complexity O(n)
function getPairsCount(arr, n, sum) {
    let count = 0;

    let map = {};

    let prefixSum = 0;

    map[0] = 1;

    for (let i = 0; i < n; i++) {
        prefixSum += arr[i];

        // Check if the prefix sum minus the desired sum exists in the map
        if (map[prefixSum - sum]) {
            count += map[prefixSum - sum]; // count of prefixSum
            map[prefixSum]++; // prefixSum ko increase kar do
        }

        // update the map with the current prefix sum
        if (map[prefixSum]) {
            map[prefixSum]++;
        } else {
            map[prefixSum] = 1;
        }

    }

    console.log(map);
    return count;
}
let arr = [3, 4, 5, 3, -6, 4, -2, 12];
let sum = 8;
// ouput - 3 // [5,3], 

// let arr = [2, 1, 7, -4, 2, 1, 3, 4, -15, 2, -3, 6];
// let sum = 6
// // output - 7

// let arr = [1, 2, 3];
// let sum = 3
// // output - 2

let n = arr.length;
console.log(getPairsCount(arr, n, sum)); 