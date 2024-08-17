// Count the number of nice subarrays

// Similar to - count binary subArray sum equal to k

// exp - 1
// nums = [1,1,2,1,1]
// k = 3;  // length of odd num must be equal to k
// ans = 2 // [1,1,2,1], [1,2,1,1] => odd num Length = 3, even num length = 1

// exp - 2
// nums = [1,5,2,1,1],  k = 3
// ans =  2 //  [1,5,2,1], [5,2,1,1]

function CountNumOfNiceSubArr(arr, k) {
    let left = 0;
    let right = 0;
    let count = 0;
    let sum = 0;

    while (right < arr.length) {
        sum += arr[right] % 2;

        while (sum > k) {
            sum -= arr[left] % 2;
            left++;
        }

        count += (right - left + 1);

        right++;
    }

    return count;
}

// let arr = [1, 1, 2, 1, 1]; // 2 // [1, 1, 2, 1], [1, 2, 1, 1]
let arr = [1, 5, 2, 1, 1] // 2 //  [1,5,2,1], [5,2,1,1]
let k = 3;
console.log(CountNumOfNiceSubArr(arr, k) - CountNumOfNiceSubArr(arr, k - 1)); 
