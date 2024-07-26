// From Coder Army
// Max Difference between two element - kisi element ka apne aage vale se difference kitna hai

// Brute Force - Time Complexity - O(n^2)

function maxDifference(arr, n) {
    let ans = 0;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            ans = Math.max(ans, arr[j] - arr[i])
        }
    }

    return ans;
}

let arr = [9, 5, 8, 12, 2, 3, 7, 4];
let n = arr.length;
console.log(maxDifference(arr, n)); // 7

// ---------------------------------------------------------

// Second Approach - Time Complexity - O(n)
// 
function maxDifference(arr, n) {
    let suffixSum = arr[n - 1];
    let maxDifference = 0;
    for (let i = n - 2; i >= 0; i--) {
        maxDifference = Math.max(suffixSum - arr[i], maxDifference);
        suffixSum = Math.max(arr[i], suffixSum);
    }

    return maxDifference;
}

let arr = [9, 5, 8, 12, 2, 3, 7, 4];
console.log(maxDifference(arr, arr.length)); // 7

// --------------------------------------------------------------------------------

// Third Approach - Time complexity - O(n)
function maxDifference(arr, n) {
    let maxSuffix = arr[n - 1];
    let arr2 = []; //  [12, 12, 12, 12, 7, 7, 7, 4]
    for (let i = n - 1; i >= 0; i--) {
        maxSuffix = Math.max(maxSuffix, arr[i]);
        arr2[i] = maxSuffix;
    }

    let maxDifference = 0;
    for (let i = n - 2; i >= 0; i--) {
        maxDifference = Math.max(maxDifference, arr2[i + 1] - arr[i]);
    }

    // console.log(arr2); //  [12, 12, 12, 12, 7, 7, 7, 4]
    return maxDifference;
}

let arr = [9, 5, 8, 12, 2, 3, 7, 4];
console.log(maxDifference(arr, arr.length)); // 7 // 12 - 5 = 7
