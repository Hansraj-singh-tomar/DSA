// Maximal Rectangle - we have to find maximum rectangle of 1 in 2D matrix.
// Pre-requisite => largest rectangle in histogram question

// TC - O(r*c) + O(n * 2r)
// SC - O(r*c) + O(n)

function largestRectangleInHistogram(arr) {
    let st = [];
    let maxArea = 0;
    let n = arr.length;
    for (let i = 0; i < n; i++) {
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
        let elm = st.pop();
        let nse = n;
        let pse = st.length == 0 ? -1 : st[st.length - 1];
        maxArea = Math.max(arr[elm] * (nse - pse - 1), maxArea);
    }

    return maxArea;
}

function maximalRectangle(matrix) {
    let r = matrix.length;
    let c = matrix[0].length;
    let prefixSumMatrix = Array.from({ length: r }, () => new Array(c).fill(0));

    // we are creating matrix of prefix sum
    for (let j = 0; j < c; j++) {
        let sum = 0;
        for (let i = 0; i < r; i++) {
            sum += matrix[i][j]
            if (matrix[i][j] == 0) sum = 0;
            prefixSumMatrix[i][j] = sum;
        }
    }

    let maximalRectangle = 0;

    for (let i = 0; i < r; i++) {
        maximalRectangle = Math.max(maximalRectangle, largestRectangleInHistogram(prefixSumMatrix[i]));
    }

    return maximalRectangle;
}

let matrix = [
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0],
]

console.log(maximalRectangle(matrix)); // 6

// prefix sum of matrix
// [
//   [1,0,1,0,1],
//   [2,0,2,1,2],
//   [3,1,3,2,3],
//   [4,0,0,3,0],
// ]