function nse(arr) {
    let nse = [];
    let stack = [];

    for (let i = arr.length - 1; i >= 0; i--) {
        while (stack.length !== 0 && arr[i] < stack[stack.length - 1]) {
            stack.pop();
        }

        if (stack.length == 0) {
            nse[i] = -1;
        } else {
            nse[i] = stack[stack.length - 1];
        }

        stack.push(arr[i]);
    }

    return nse;
}

// let arr = [3, 1, 2, 4]; //  [1, -1, -1, -1]
let arr = [1, 4, 6, 7, 3, 7, 8, 1]; // [1, 3, 3, 3, 1, 1, 1, -1]
console.log(nse(arr));
