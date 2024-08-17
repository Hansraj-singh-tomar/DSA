// Brute force approach

// we will mark every row and column -1 apart from 0;
// then next we convert all -1 to 0

let arr = [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
]

let row = arr.length;
let column = arr[0].length;

function markCol(j) {
    for (let i = 0; i < column; i++) {
        if (arr[i][j] !== 0) {
            arr[i][j] = -1;
        }
    }
}

function markRow(i) {
    for (let j = 0; j < row; j++) {
        if (arr[i][j] !== 0) {
            arr[i][j] = -1;
        }
    }
}

for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
        if (arr[i][j] == 0) {
            markRow(i);
            markCol(j);
        }
    }
}

for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
        if (arr[i][j] == -1) {
            arr[i][j] = 0;
        }
    }
}

console.log(arr);

// output -
// [
//     [1, 0, 0, 1],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [1, 0, 0, 1],
// ]

// ------------------------------------------------------------------------------

// TC - O(2 * n * m) - O(n^2)
// SC - O(n) + O(m)
let arr1 = [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
]

let m = arr1.length;
let n = arr1[0].length;

let row1 = new Array(m);
let col1 = new Array(n);

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (arr1[i][j] == 0) {
            row1[i] = 1;
            col1[j] = 1;
        }
    }
}

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (row1[i] || col1[j]) {
            arr1[i][j] = 0;
        }
    }
}

console.log(row1); // [empty, 1, 1, empty]
console.log(col1); // [empty, 1, 1, empty]
console.log(arr1);
// output -
// [
//     [1, 0, 0, 1],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [1, 0, 0, 1],
// ]

// --------------------------------------------------------------------------

// TC - O(n^2)
// SC - O(1)
// we can't achive O(n) time complexity
// but reduce the space complexity

// we will make row[0] to row[]
// we will make col[0] to col[]
// but element of col[0] element row[o] will overlap to each other for that
// we will create a single variable for col[0] = 1
// we will start iterating from the right side till 1 not to 0
// or we can start i = 1 and j = 1 for the iteration.
// then we will change the column then row

let matrix = [
    [1, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 0, 1],
    [0, 1, 1, 1],
]

let m1 = matrix.length;
let n1 = matrix[0].length;

// let row = matrix[i][0]; // first column
// let col = matrix[0][j]; // first row

for (let i = 0; i < m1; i++) {
    for (let j = 0; j < n1; j++) {
        if (matrix[i][j] == 0) {
            // mark the i-th row
            matrix[i][0] = 0; // row array
            // mark the j-th col
            if (j !== 0) {
                matrix[0][j] = 0; // col array
            } else {
                col0 = 0;
            }
        }
    }
}

for (let i = 1; i < m1; i++) {
    for (let j = 1; j < n1; j++) {
        if (matrix[i][j] !== 0) {
            // check for col and row 
            if (matrix[0][j] == 0 || matrix[i][0] == 0) {
                matrix[i][j] = 0;
            }
        }
    }
}

if (matrix[0][0] == 0) {
    for (let j = 0; j < n1; j++) {
        matrix[0][j] = 0;
    }
}

if (col0 == 0) {
    for (let i = 0; i < n1; i++) {
        matrix[i][0] = 0;
    }
}

console.log(matrix);

// output -
// [
//     [0, 0, 0, 1],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
// ]