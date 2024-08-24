// TC - O(5n)
// SC - O(2n) + O(2n)

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

function largestRectangleInHistogram(arr) {
    let pse = prevSmallerElm(arr); // [-1, -1, 1, 2, 1, 4];
    let nse = nextSmallerElm(arr); // [1, 6, 4, 4, 6, 6];
    let max = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i] * (nse[i] - pse[i] - 1));
    }
    return max;
}

let arr = [2, 1, 5, 6, 2, 3];
console.log(largestRectangleInHistogram(arr)); // 10

// ------------------------------------------------------------------------


function largestRectangleInHistogram(arr) {
    let st = []; // In that we have to store the indexes 
    let maxArea = 0;

    for (let i = 0; i < arr.length; i++) {
        while (st.length !== 0 && arr[i] < arr[st[st.length - 1]]) {
            let elm = st[st.length - 1];
            st.pop();
            let nse = i;
            let pse = st.length == 0 ? -1 : st[st.length - 1];
            maxArea = Math.max(arr[elm] * (nse - pse - 1), maxArea);
        }
        st.push(i);
    }

    // Process remaining elements in the stack
    while (st.length !== 0) {
        let nse = n; // for remaining elm has no next smaller element
        let elm = st[st.length - 1];
        let pse = st.length == 0 ? -1 : st[st.length - 1];
        maxArea = Math.max(arr[elm] * (nse - pse - 1), maxArea);
    }

    return maxArea;
}

let arr2 = [3, 2, 10, 11, 5, 10, 6, 3];
console.log(largestRectangleInHistogram(arr2));

// 2 is the nse of 3
// -1 is the pse of 3 