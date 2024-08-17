// Max consecutive ones - III
// arr = [1,1,1,0,0,0,1,1,1,1,0] , k = 2
// k = 2, means we can change two zero to 1
// ans - 6, [1,1,1,0,0,1,1,1,1,1,1]

// Brute force - generate all the subArr

function maxConsecutive(arr, k) {
    let maxLength = 0;
    for (let i = 0; i < arr.length; i++) {
        let zero = 0;
        let count = 0;
        for (let j = i; j < arr.length; j++) {
            if (arr[j] == 0) zero++;
            if (zero <= k) {
                count++;
                maxLength = Math.max(maxLength, count);
            } else {
                break;
            }
        }
    }

    return maxLength;
}

let arr = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0];
let k = 2;
console.log(maxConsecutive(arr, k)); // 6

// -----------------------------------------------------

// TC - O(2n)
// SC - O(1)

function maxConsecutive(arr, k) {
    let maxLength = 0;
    let left = 0;
    let right = 0;
    let zeros = 0;
    while (right < arr.length) {
        while (zeros > k) {
            if (arr[left] == 0) {
                zeros--;
            }
            left++;
        }

        if (arr[right] == 0) {
            zeros++;
        }

        if (zeros <= k) {
            maxLength = Math.max(maxLength, right - left + 1);
        }

        right++;
    }

    return maxLength;
}

// let arr1 = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0];
let arr1 = [1, 1, 1, 1, 0, 0, 0];
let k1 = 2;
console.log(maxConsecutive(arr1, k1));

// ------------------------------------------------------------------------------

// TC - O(n)
// SC - O(1)

function maxConsecutive(arr, k) {
    let maxLength = 0;
    let left = 0;
    let right = 0;
    let zeros = 0;
    while (right < arr.length) {
        if (arr[right] == 0) zeros++;

        if (zeros > k) {
            if (arr[left] == 0) zeros--;
            left++;
        }

        if (zeros <= k) maxLength = Math.max(right - left + 1, maxLength);

        right++;
    }

    return maxLength;
}

let arr2 = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0];
let k2 = 2;
console.log(maxConsecutive(arr2, k2)); // 6
