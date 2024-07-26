// Length of longest subarray with almost k frequency
// arr = [1,2,3,1,2,3,3,4,1,2] , k = 2
// repeated element can less than and equal to 2.
// valid subArr = [1,2]
// valid subArr = [1,2,3,1] => {1: 2, 3: 1, 2: 1}
// invalid subArr = [3,1,2,3,3] => {3: 3, 1: 1, 2: 1}
// we have to find longest subArr

function subArrWithKFreq(arr, k) {
    // i have to use two pointer in that
    // create map = {}

    let start = 0;
    let end = 0;
    let map = {};
    let maxLength = 0;

    while (end < arr.length) {
        map[arr[end]] = (map[arr[end]] || 0) + 1;
        while (map[arr[end]] > k) {
            map[arr[start]]--;
            start++;
        }
        maxLength = Math.max(maxLength, end - start + 1);
        end++;
    }

    return maxLength;
}

let arr = [1, 2, 3, 1, 2, 3, 3, 4, 1, 2];
let k = 2;
console.log(subArrWithKFreq(arr, k)); // 8 // [1, 2, 3, 3, 4, 1, 2]