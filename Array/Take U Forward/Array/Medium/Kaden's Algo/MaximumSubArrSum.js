// Maximum Subarray sum

// Brute force
// TC - O(n^3)

function maximumSubArrSum(arr) {
    let maxSum = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            let sum = 0;
            for (let k = i; k <= j; k++) {
                sum += arr[k];
            }
            maxSum = Math.max(sum, maxSum);
        }
    }

    return maxSum;

}

let arr1 = [-2, -3, 4, -1, -2, 1, 5, -3];
console.log(maximumSubArrSum(arr1)); // 7

// --------------------------------------------------------

// better approach 
// TC - O(n^2)

function maximumSubArrSum(arr) {
    let maxSum = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        for (let j = i; j < arr.length; j++) {
            sum += arr[j];
            maxSum = Math.max(maxSum, sum)
        }
    }

    return maxSum;
}

let arr2 = [-2, -3, 4, -1, -2, 1, 5, -3];
console.log(maximumSubArrSum(arr2)); // 7

// -------------------------------------------------------------

// Optimal approach - using kaden's algorithm
// TC - O(n)

function maximumSubArrSum(arr) {
    let maxSum = -Infinity;

    let sum = 0;

    let start = 0;
    let end = 0;
    for (let i = 0; i < arr.length; i++) {
        if (sum == 0) {
            start = i;
        }

        sum += arr[i];

        if (sum > maxSum) {
            maxSum = sum;
            end = i
        }

        if (sum < 0) {
            sum = 0;
        }
    }

    return [start, end];
}

let arr3 = [-2, -3, 4, -1, -2, 1, 5, -3];
console.log(maximumSubArrSum(arr3)); // 7