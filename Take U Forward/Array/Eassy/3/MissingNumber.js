// Missing Number

// Brute Force approach
// TC - O(n^2)
// SC - O(n)

// function missingNumber(arr, n) {
//     for (let i = 1; i <= n; i++) {
//         let flag = 0;
//         for (let j = 0; j < n - 1; j++) {
//             if (arr[j] == i) {
//                 flag = 1;
//                 break;
//             }
//         }
//         if (flag == 0) {
//             return i;
//         }
//     }
// }

// let arr = [1, 2, 4, 5];
// let n = 5;
// console.log(missingNumber(arr, n)); // 3

// ----------------------------------------------------------------------------

//  Better approach - using hash
// TC - O(n1 + n2)

// function missingNumber(arr1, n1) {
//     let hashArr = new Array(n1 + 1).fill(0);

//     for (let i = 0; i < n1 - 1; i++) {
//         hashArr[arr1[i]] = 1;
//     }

//     // console.log(hashArr); // [0, 1, 1, 1, 1, 0]

//     for (let i = 1; i <= n1; i++) {
//         if (hashArr[i] == 0) {
//             return i;
//         }
//     }
// }

// let arr1 = [1, 2, 3, 4];
// let n1 = 5;
// console.log(missingNumber(arr1, n1)); // 5

// ----------------------------------------------------------

// Optimal approach
// using sum of array element
// TC - O(n)
// SC - O(1)

function missingNumber(arr, n) {
    let sum = (n * (n + 1)) / 2;
    console.log(sum); // 15

    for (let i = 0; i < arr.length; i++) {
        sum -= arr[i];
    }

    return sum;
}

let arr = [1, 2, 3, 4];
let n = 5;
console.log(missingNumber(arr, n)); // 5