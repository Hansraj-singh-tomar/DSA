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


let arr2 = [6, -1, -3, 4, -2, 2, 4, 6, -12, -2]
let n2 = arr.length;
let sum2 = 0;
console.log(getPairsCount(arr2, n2, sum2)); // 5

// --------------------------------------------------------------

function getPairsCount(arr, n, sum) {
    let count = 0;

    let map = {};

    let prefixSum = 0;

    // imp - don't miss it
    map[0] = 1;

    for (let i = 0; i < n; i++) {
        prefixSum += arr[i];

        // Check if the prefix sum minus the desired sum exists in the map
        if (map[prefixSum - k]) {
            count += map[prefixSum - k]; // count of prefixSum
            map[prefixSum]++; // prefixSum ko increase kar do
        }

        // update the map with the current prefix sum
        if (!map[prefixSum]) {
            map[prefixSum] = 1;
        }
    }

    console.log(map);
    return count;
}
let arr3 = [1, 2, 3, -3, 1, 1, 1, 4, 2, -3];
let k = 3; // 8

// let arr = [3, 4, 5, 3, -6, 4, -2, 12];
// let k = 8;
// // output - 3

// let arr = [2, 1, 7, -4, 2, 1, 3, 4, -15, 2, -3, 6];
// let k = 6
// // output - 6

// let arr = [1, 2, 3];
// let k = 3
// // output - 2

let n3 = arr.length;
console.log(getPairsCount(arr3, n3, k)); 
