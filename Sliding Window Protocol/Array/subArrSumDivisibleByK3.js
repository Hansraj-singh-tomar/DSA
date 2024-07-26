// Sub Array sum divided by k
// arr => 2, 3, -8, -3, 11, 4, 8, 6, 9, 4
// pre => 2, 5, -3, -6, 5, 9, 17, 23, 32, 36
// rem => 2, 5, -3, -6, 5, 2, 3, 2, 4, 1
// map = {0: 1, 1: 2, 2: 3, 3: 1, 4: 2, 5: 2}
function subArrSumDividedByK(arr, k) {
    let subArrCount = 0;
    let prefixSum = 0;
    let rem;
    let map = {};
    map[0] = 1;

    for (let i = 0; i < arr.length; i++) {
        prefixSum += arr[i];
        rem = prefixSum % k;

        // if our reminder is negative, make it possitive
        if (rem < 0) {
            rem = k + rem;  // -3 + 7 = 4
        }

        if (map[rem]) {
            subArrCount += map[rem];
            map[rem]++;
        } else {
            map[rem] = 1;
        }
    }

    console.log(map); // {0: 1, 1: 2, 2: 3, 3: 1, 4: 2, 5: 2}
    return subArrCount;
}

let arr = [2, 3, -8, -3, 11, 4, 8, 6, 9, 4];
let k = 7;
console.log(subArrSumDividedByK(arr, k)); // 6