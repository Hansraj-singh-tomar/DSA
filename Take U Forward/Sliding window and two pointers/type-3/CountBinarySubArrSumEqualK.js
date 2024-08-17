// Binary subArray with sum // Watch before - count subArray sum equals k (array elem can have positive and negetive elm)
// But in this question there is no any negetive element.

// Binary Arr = [1,0,1,0,1], goal/sum = 2
// ans - 4 // [1,0,1], [1,0,1,0], [0,1,0,1], [1,0,1]

// TC - O(4n)
// SC - O(1)

function CountBinarySubArrSumEqualToK(arr, k) {
    let left = 0;
    let right = 0;
    let count = 0;
    let sum = 0;

    if (k < 0) return 0;

    while (right < arr.length) {

        sum = sum + arr[right];

        while (sum > k) {
            sum = sum - arr[left];
            left++;
        }

        count = count + (right - left + 1);
        right++;
    }

    return count;
}

// let arr = [1, 0, 0, 1, 1, 0];
let arr = [1, 0, 1, 0, 1];
let k = 2;
console.log(CountBinarySubArrSumEqualToK(arr, k) - CountBinarySubArrSumEqualToK(arr, k - 1)); // 4
