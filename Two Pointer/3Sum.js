// Three sum

// Using Brute Force
// Time complexity - O(n^3)
function threeSum(arr, n, target) {
    for (let i = 0; i < n - 2; i++) {
        for (let j = i + 1; j < n - 1; j++) {
            for (let k = j + 1; k < n; k++) {
                if (arr[i] + arr[j] + arr[k] == target) {
                    return true;
                }
            }
        }
    }
    return false;
}

let arr = [1, 4, 45, 6, 10, 8]
console.log(threeSum(arr, arr.length, 24));

// ---------------------------------------------------------------

// In that we sort the array
// Time complexity - O(n^2 logn)
// Using binary search
function threeSum(arr, n, target) {
    for (let i = 0; i < n - 2; i++) {
        for (let j = i + 1; j < n - 1; j++) {
            // now in that we will use binary search
            let find = target - arr[i] - arr[j];
            let start = j + 1;
            let end = n - 1;

            let mid = Math.floor(start + (end - start) / 2);

            if (arr[mid] == find) {
                return [arr[i], arr[j], arr[mid]]
            } else if (find > arr[mid]) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }

    return false;
}

let arr = [1, 4, 45, 6, 10, 8]
console.log(threeSum(arr.sort((a, b) => a - b), arr.length, 24)); // [6, 10, 8]

// --------------------------------------------------------------------------------

// Using two pointer in that
// Time complexity - O(n^2)
function threeSum(arr, n, target) {
    // let ans;
    for (let i = 0; i < n - 2; i++) {
        let ans = target - arr[i];
        let start = i + 1;
        let end = n - 1;

        while (start < end) {
            if (arr[start] + arr[end] == ans) {
                return [arr[i], arr[start], arr[end]]
                // return true;
            } else if (ans > arr[start] + arr[end]) {
                end--;
            } else {
                start++;
            }
        }
    }
    return false;
}

let arr = [1, 4, 45, 6, 10, 8]
console.log(threeSum(arr, arr.length, 24)); // [6, 10, 8]
