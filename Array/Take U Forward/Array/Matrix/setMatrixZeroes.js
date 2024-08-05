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

