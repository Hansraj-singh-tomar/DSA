// sum of subArrays Minimums
// arr = [3,1,2,4]
// subArr=>
// [3] -> 3  // [1] -> 1 // [2] -> 2 // [4] -> 4
// [3, 1] -> 1  // [1, 2] -> 1 // [2,4] -> 2
// [3, 1, 2] -> 1 // [1,2,4] => 1
// [3, 1, 2, 4] -> 1
// ans => 3+1+1+1+1+1+1+2+2+4 => 17


// TC - O(n^2)

function sumOfSubArrMinimums(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        let min = arr[i];
        for (let j = i; j < arr.length; j++) {
            min = Math.min(min, arr[j]);
            sum += min;
        }
    }
    return sum;
}

let arr1 = [3, 1, 2, 4];
console.log(sumOfSubArrMinimums(arr1)); // 17


// ----------------------------------------------------------------------------

// TC - O(5n)
// SC - O(5n)

function prevSmallerElm(arr) {
    let stack = [];
    let n = arr.length;
    let pse = new Array(n);

    for (let i = 0; i < n; i++) {
        // Remember : we are storing indexes in stack
        while (stack.length !== 0 && arr[stack[stack.length - 1]] > arr[i]) { //
            stack.pop();
        }

        pse[i] = stack.length == 0 ? -1 : stack[stack.length - 1];

        stack.push(i);
    }

    return pse;
}

function nextSmallerElm(arr) {
    let n = arr.length;
    let nse = new Array(n);
    let stack = [];

    for (let i = n - 1; i >= 0; i--) {
        // Remember: we are storing indexes in stack
        while (stack.length !== 0 && arr[i] <= arr[stack[stack.length - 1]]) {
            stack.pop();
        }

        if (stack.length == 0) {
            nse[i] = n;
        } else {
            nse[i] = stack[stack.length - 1];
        }

        stack.push(i);
    }

    return nse;
}

function sumOfSubArrMinimums(arr) {
    let sum = 0;
    let prev = prevSmallerElm(arr);
    let next = nextSmallerElm(arr);

    for (let i = 0; i < arr.length; i++) {
        left = i - prev[i];
        right = next[i] - i;

        sum = sum + left * right * arr[i]
    }
    return sum;
}

// let arr = [3, 1, 2, 4]; // 17
let arr = [1, 4, 6, 7, 3, 7, 8, 1];
console.log(sumOfSubArrMinimums(arr));


