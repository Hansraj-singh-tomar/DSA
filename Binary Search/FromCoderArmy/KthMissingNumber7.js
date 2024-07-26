// binary search series ka 3rd vala video hai jisse last me solve kiya gya hai

// from striver logic
function kMissingElm(arr, k) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        // let mid = Math.floor((start + end) / 2);
        let mid = Math.floor(start + (end - start) / 2);
        let missing = arr[mid] - mid + 1;

        if (missing < k) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    return end + 1 + k;
}

let arr = [2, 3, 4, 7, 11, 12]; // 10
// let arr = [4,7,8]
console.log(kMissingElm(arr, 6));



// from chat gpt - this is doing as a linear search
// function findKthPositive(arr, k) {
//     let missingCount = 0;
//     let currentNumber = 1;
//     let arrIndex = 0;

//     while (missingCount < k) {
//         if (arrIndex < arr.length && arr[arrIndex] === currentNumber) {
//             arrIndex++;
//         } else {
//             missingCount++;

//             if (missingCount === k) {
//                 return currentNumber;
//             }
//         }
//         currentNumber++;
//     }

//     return currentNumber + (k - missingCount) - 1;
// }

// const arr = [2, 3, 4, 7, 11, 12];
// const k = 5;
// console.log(findKthPositive(arr, k));


