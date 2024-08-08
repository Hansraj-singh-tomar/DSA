function getPairsCount(arr, n, sum) {
    let count = 0;

    let map = {};

    let prefixSum = 0;

    // imp - don't miss it
    map[0] = 1;

    for (let i = 0; i < n; i++) {
        prefixSum += arr[i];

        // Check if the prefix sum minus the desired sum exists in the map
        if (map[prefixSum - k]) {
            count += map[prefixSum - k]; // count of prefixSum
            map[prefixSum]++; // prefixSum ko increase kar do
        }

        // update the map with the current prefix sum
        if (!map[prefixSum]) {
            map[prefixSum] = 1;
        }
    }

    console.log(map);
    return count;
}
let arr = [1, 2, 3, -3, 1, 1, 1, 4, 2, -3];
let k = 3; // 8

// let arr = [3, 4, 5, 3, -6, 4, -2, 12];
// let k = 8;
// // output - 3

// let arr = [2, 1, 7, -4, 2, 1, 3, 4, -15, 2, -3, 6];
// let k = 6
// // output - 6

// let arr = [1, 2, 3];
// let k = 3
// // output - 2

let n = arr.length;
console.log(getPairsCount(arr, n, k)); 
