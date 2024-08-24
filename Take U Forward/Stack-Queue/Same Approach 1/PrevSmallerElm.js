// Previous Smaller element
// arr = [4,5,2,10,8]
// ans = [-1, 4, -1, 2, 2]

// TC - O(2n)
// SC = O(n) + O(n)
function prevSmallerElm(arr) {
    let stack = [];
    let n = arr.length;
    let pse = new Array(n);

    for (let i = 0; i < n; i++) {
        while (stack.length !== 0 && stack[stack.length - 1] > arr[i]) {
            stack.pop();
        }

        // if (stack.length === 0) {
        //     pse[i] = -1;
        // } else {
        //     pse[i] = stack[stack.length - 1];
        // }

        // using ternary operator
        pse[i] = stack.length == 0 ? -1 : stack[stack.length - 1];

        stack.push(arr[i]);
    }

    return pse;
}

let arr = [4, 5, 2, 10, 8];
console.log(prevSmallerElm(arr)); // [-1, 4, -1, 2, 2]
