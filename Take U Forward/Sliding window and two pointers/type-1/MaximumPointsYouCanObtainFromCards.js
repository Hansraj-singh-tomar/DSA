// Maximum points you can obtain from the cards

// arr = [6,2,3,4,7,2,1,7,1];
// k = 4;
// we have to pick 4elm from this array, it can be 4 starting elm or from the end or two from the start and two from the end and so on
// Note - you can't pick more than 4 elm or not from the between of this array

// leftSum    rightSum    Total
//    15       0           15
//    11       1           12
//    8        8           16(Answer)
//    6        9           15
//    0        11          11

function MaximumPoint(arr, k) {
    let lSum = 0;
    let rSum = 0;
    let maxPoint = 0;
    for (let i = 0; i < k; i++) {
        lSum += arr[i];
    }
    maxPoint = lSum;

    let rightIdx = arr.length - 1;
    for (let j = k - 1; j >= 0; j--) {
        lSum -= arr[j];
        rSum += arr[rightIdx];
        rightIdx = rightIdx - 1;
        maxPoint = Math.max(maxPoint, lSum + rSum);
    }

    return maxPoint;
}

let arr = [6, 2, 3, 4, 7, 2, 1, 7, 1];
let k = 4;
console.log(MaximumPoint(arr, k)); // 16
