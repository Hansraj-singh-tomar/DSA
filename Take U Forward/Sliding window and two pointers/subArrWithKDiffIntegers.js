// SubArray with k different integers
// arr = [1, 2, 1, 3, 4], k = 3;
// ans = 3 // [1, 2, 1, 3], [2, 1, 3], [1, 3, 4] 

// TC - O(n^2)
// SC - O(n)

function subArrWithKDiffIntegers(arr, k) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        let hash = {};

        for (let j = i; j < arr.length; j++) {
            hash[arr[j]] = (hash[arr[j]] || 0) + 1;
            if (Object.keys(hash).length == k) {
                count++;
            } else if (Object.keys(hash).length > k) {
                break;
            }
        }
    }
    return count;
}

let arr = [1, 2, 1, 3, 4];
let k = 3;
console.log(subArrWithKDiffIntegers(arr, k)); // 3 // [1, 2, 1, 3], [2, 1, 3], [1, 3, 4]

// ---------------------------------------------------------------------------------------------------

// TC - O(2n)
// SC - O(n)

// Note - we are not sure when to shrink or expand the window
// for that we will find subArray which is leser than to k

function subArrWithKDiffIntegers(arr, k) {
    let count = 0;
    let hash = {};
    let left = 0;
    let right = 0;

    if (k < 0) return 0;

    while (right < arr.length) {
        hash[arr[right]] = (hash[arr[right]] || 0) + 1;


        while (Object.keys(hash).length > k) {
            hash[arr[left]]--;
            if (hash[arr[left]] == 0) {
                delete hash[arr[left]]
            }
            left++;
        }


        // Add the number of subarrays ending at the current element
        count += right - left + 1;

        right++;
    }
    return count;
}

// let arr = [1, 2, 1, 3, 4]; // 3 // [1, 2, 1, 3], [2, 1, 3], [1, 3, 4] 
let arr2 = [2, 1, 1, 1, 3, 4, 3, 2]; // 9 // [2, 1, 1, 1, 3], [1, 1, 1, 3, 4], [1, 1, 3, 4], [1, 3, 4], [1, 1, 1, 3, 4, 3], [1, 1, 3, 4, 3], [1, 3, 4, 3], [3, 4, 3, 2], [4, 3, 2]
let k2 = 3;
console.log(subArrWithKDiffIntegers(arr2, k2) - subArrWithKDiffIntegers(arr2, k2 - 1)); 
