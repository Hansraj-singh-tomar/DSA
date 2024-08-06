// Rotate Matrix by 90 degree
// notes on copy

// TC - O(n^2)
// SC - O(n^2)

let matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
]

let n = matrix.length;

let row = matrix.length;
let col = matrix[0].length;

let ansMatrix = Array.from({ length: row }, () => Array(col).fill(undefined));

for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
        ansMatrix[j][n - 1 - i] = matrix[i][j];
    }
}

console.log(ansMatrix);

// Output -
// [
//  [13, 9, 5, 1],
//  [14, 10, 6, 2].
//  [15, 11, 7, 3]
//  [16, 12, 8, 4]
// ]

// --------------------------------------------------------------------

// TC - O(n/2 + n/2) + O(n + n/2)
// SC - O(1)

let matrixx = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
]

let nn = matrix.length;

// tranpose the matrix 
for (let i = 0; i < nn - 1; i++) {
    for (let j = i + 1; j < nn; j++) {
        [matrixx[i][j], matrixx[j][i]] = [matrixx[j][i], matrixx[i][j]]
    }
}

// reverse the row
// TC - O(n + n/2)

for (let i = 0; i < nn; i++) {
    matrixx[i].sort((a, b) => b - a);
}

console.log(matrixx);

// Output -
// [
//  [13, 9, 5, 1],
//  [14, 10, 6, 2].
//  [15, 11, 7, 3]
//  [16, 12, 8, 4]
// ]
