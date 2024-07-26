// right rotate (k = 2)=> [1,2,3,4,5] =  [4,5,1,2,3];
// left rotate (k = 2) => [1,2,3,4,5] = [3,4,5,1,2];

// left rotate
// Brute force approach
// TC - O(n) + O(n-d) + O(d) = O(n + d)
// function rotate(arr, D) {
//     let n = arr.length;
//     let temp = [];
//     // let temp = new Array(D);

//     for (let i = 0; i < D; i++) {
//         temp.push(arr[i]);
//     }

//     // shifting
//     for (let i = D; i < n; i++) {
//         arr[i - D] = arr[i];
//     }

//     // push back temp item into an arr
//     let j = 0;
//     for (let i = n - D; i < n; i++) {
//         arr[i] = temp[j];
//         j++;
//     }
//     return arr;
// }

// let arr1 = [1, 2, 3, 4, 5, 6];
// let D = 2;
// console.log(rotate(arr1, D)); // [3,4,5,6,1,2];

// ----------------------------------------------------------

// right rotate
// optimal approach
// TC - O(d) + O(n-d) + O(n) = O(2n)
// SC - O(1)

function rotate(arr, start, end) {
    while (start < end) {
        let temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}

function rotateArrByK(arr, k) {
    let n = arr.length;
    k = k % arr.length; // if length of k is more than array length, to handle that situation
    rotate(arr, 0, n - 1);
    rotate(arr, 0, k - 1);
    rotate(arr, k, n - 1);
    return arr;
}


let arr = [1, 2, 3, 4, 5, 6];
let k = 2;
console.log(rotateArrByK(arr, k)); // [5,6,1,2,3,4]


// ----------------------------------------------------------------------

// left rotate
// optimal approach
// TC - O(d) + O(n-d) + O(n) = O(2n)
// SC - O(1)

function rotate(arr, start, end) {
    while (start < end) {
        let temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}

function rotateArrByK(arr, k) {
    let n = arr.length;
    k = k % arr.length; // if length of k is more than array length, to handle that situation
    rotate(arr, 0, k - 1);
    rotate(arr, k, n - 1);
    rotate(arr, 0, n - 1);
    return arr;
}


let arr3 = [1, 2, 3, 4, 5, 6];
let M = 2;
console.log(rotateArrByK(arr3, M)); // [3,4,5,6,1,2]
