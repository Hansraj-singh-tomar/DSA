// longest subarray with sum K [positive]

// Brute force approach
// TC - approax O(n^3) 

function longestSubArr(arr, x) {
    let length = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            let sum = 0;
            for (let k = i; k <= j; k++) {
                sum += arr[k];
            }
            if (sum == x) {
                length = Math.max(length, j - i + 1)
            }
        }
    }

    return length;
}

let arr = [1, 2, 3, 1, 1, 1, 4, 2, 3];
let x = 3;
console.log(longestSubArr(arr, x)); // 3

// ---------------------------------------------------------

// TC - O(n^2)
// using prefix sum problem


function longestSubArr(arr, k) {
    let length = 0;

    for (let i = 0; i < arr.length; i++) {
        let prefixSum = 0;
        for (let j = i; j < arr.length; j++) {
            prefixSum += arr[j];

            if (prefixSum == k) {
                length = Math.max(length, j - i + 1);
            }
        }
    }

    return length;
}

let arr1 = [1, 2, 3, 1, 1, 1, 4, 2, 3];
let k = 3;
console.log(longestSubArr(arr1, k)); // 3

// ---------------------------------------------------------------

// If array elements are positive and zero, not negative
// Optimal approach - using two pointers approach
// TC - O(n)

function longestSubArr(arr, k) {
    let right = 0;
    let left = 0;
    let maxLength = 0;
    let sum = arr[0];
    let n = arr.length;

    while (right < n) {
        while (left <= right && sum > k) {
            sum -= arr[left];
            left++;
        }

        if (sum == k) {
            maxLength = Math.max(maxLength, right - left + 1);
        }
        right++;
        if (right < n) {
            sum += arr[right]
        }
    }
    return maxLength;
}

let arr2 = [1, 2, 3, 1, 1, 1, 1, 3, 3];
let k2 = 6;
console.log(longestSubArr(arr2, k2)); // 4

