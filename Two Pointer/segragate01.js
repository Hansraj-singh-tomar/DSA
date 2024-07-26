// we have to three approach to solve it
// 1. brute force => (O(n^2))
// 2. sort() method => (O(n logN))
// 3. bubble, insertion and selection sort() => (O(n^2))


// Time complexity of below is o(n)
// isme hamane array ko two time traverse kiya hai,
// with the help of two pointer we can traverse array only at once.


// function segragate(arr) {
//     let count0 = 0;
//     let count1 = 0;

//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] == 0) {
//             count0++;
//         } else {
//             count1++;
//         }
//     }

//     for (let i = 0; i < count0; i++) {
//         arr[i] = 0;
//     }

//     for (let i = count0; i < count1; i++) {
//         arr[i] = 1;
//     }

//     return arr;
// }

// let arr = [0, 1, 0, 1, 0];
// console.log(segragate(arr)); // [0 , 0, 0, 1, 1]


// using Two pointers - from coder army
let arr = [1, 0, 0, 1, 0];
let start = 0;
let end = arr.length;

while (start < end) {
    if (arr[start] == 0) {
        start++;
    } else {
        if (arr[end] == 0) {
            [arr[start], arr[end]] = [arr[end], arr[start]]
            start++;
            end--;
        } else {
            end--;
        }
    }
}

console.log(arr); // [0,0,0,1,1];