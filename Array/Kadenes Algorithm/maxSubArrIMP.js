// From Coder Army
// Q. Largest sum contiguous subarray

// Brute Force - Time Complexity (O(n^2))
// [4] [-6] [2] [8]
// [4, -6] [-6, 2] [2,8]
// [4, -6, 2] [-6, 2, 8]
//  [4, -6, 2, 8]
function subArr(arr) {
    let maxSum = 0;
    for (let i = 0; i < arr.length; i++) {
        let prefixSum = 0;
        for (let j = i; j < arr.length; j++) {

            prefixSum += arr[j];

            maxSum = Math.max(prefixSum, maxSum)
        }
    }
    return maxSum;
}

let arr = [4, -6, 2, 8];
console.log(subArr(arr)); // 10

// ---------------------------------------------------

// Kaden's Algorithm
// second Way - Time complexity - O(n)
// Note - prefixSum negative dikhne par usse zero kar dena hai

function subArr(arr) {
    let maxSum = 0;
    let prefixSum = 0;
    let startIdx = 0;
    let endIdx = 0;
    for (let i = 0; i < arr.length; i++) {
        prefixSum += arr[i];

        maxSum = Math.max(prefixSum, maxSum);

        if (prefixSum < 0) {
            prefixSum = 0;
            startIdx = i;
        }
        endIdx = i;
    }
    console.log(arr.slice(startIdx + 1, endIdx + 1)); // [2,8]
    return maxSum;
}

let arr = [4, -6, 2, 8];
console.log(subArr(arr)); // 10

