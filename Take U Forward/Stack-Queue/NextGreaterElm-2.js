// Next Greater Element (Monotonic Stack)

// Monotnic Stack - Till now i'll be using stack to store elms but the
// movement we use stack to store elm in specific order. That's when we call it monotonic stack.
// may i can store elm in increasing/decreasing order.

// Problem statement - We have given an arr, for every elm in an array. we have to tell me which one is the next greater elm.

// let arr = [6,0,8,1,3];
// let ans = [8,8,-1,3,-1]; // if right side not have any greater elm than we will use -1


// Brute force
// TC = O(n^2)
// SC = O(n)

// function nextGreaterElm(arr) {
//     let nge = new Array(arr.length).fill(-1);

//     for (let i = 0; i < arr.length; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[j] > arr[i]) {
//                 nge[i] = arr[j];
//                 break;
//             }
//         }
//     }

//     return nge
// }

// let arr = [6, 0, 8, 1, 3];
// console.log(nextGreaterElm(arr)); // [8, 8, -1, 3, -1]

// ------------------------------------------------------------------

// TC - O(2n)
// SC - O(n)+O(n)
function nextGreaterElm(arr) {
    let stack = [];
    let nge = new Array(arr.length);

    for (let i = arr.length - 1; i >= 0; i--) {

        while (arr[i] >= stack[stack.length - 1] && stack.length !== 0) {
            stack.pop();
        }

        if (stack.length == 0) {
            nge[i] = -1;
            // stack.push(arr[i]);
        } else {
            nge[i] = stack[stack.length - 1];
            // stack.push(arr[i]);
        }
        stack.push(arr[i]);

        // if (arr[i] < stack[stack.length - 1] && stack.length !== 0) {
        //     nge[i] = stack[stack.length - 1];
        //     stack.push(arr[i]);
        // }
    }

    return nge;
}

let arr2 = [6, 0, 8, 1, 3];
console.log(nextGreaterElm(arr2)); // [8,8,-1,3,-1]
