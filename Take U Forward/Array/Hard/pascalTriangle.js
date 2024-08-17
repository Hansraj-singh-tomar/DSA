// pascal triangle
//        1
//      1  1
//     1   2  1
//    1  3   3  1
//   1  4  6  4  1      // Row = 5, column = 3 => ans = 6
//  1 5  10 10  5  1

// Q. Given row and column, tell me the element at that place Row = 5, column = 3 => answer is 6
// Q. Print any nth row of pascal triangle N = 5, => 1 4 6 4 1
// Q. Given N, print the entire triangle N - 6

// ------------------------------------------------------------------------------------------------------------

// Q. Given row and column, tell me the element at that place Row = 5, column = 3 => answer is 6
// nCr => n!/r!*(n-r)!
// shortcut => 7C2 => 7*6/2*1

function nCr(n, r) {
    let res = 1;

    for (let i = 0; i < r; i++) {
        res = res * (n - i);
        res = res / (i + 1);
    }

    return res;
}

let row = 5; // index start from Zero that is why we are doing row - 1
let column = 3;
console.log(nCr(row - 1, column - 1)); // 6

// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------

// Q. Print any nth row of pascal triangle N = 5, => 1 4 6 4 1

// Brute force solution
// TC - O(n * r)
function nCr(n, r) {
    let res = 1;
    for (let i = 0; i < r; i++) {
        res = res * (n - i);
        res = res / (i + 1);
    }

    return res;
}

function pascalTriangle(N) {
    let ans = [];
    for (let c = 1; c <= N; c++) {
        ans.push(nCr(N - 1, c - 1));
    }

    return ans;
}

let N = 5;
console.log(pascalTriangle(N)); // [1, 4, 6, 4, 1]

// --------------------------------------------------------------------

// optimal approach
// TC - O(n)
// SC - O(n)

function nCr(N) {
    let ans = [];
    let res = 1;
    ans.push(res)
    for (let i = 1; i < N; i++) {
        res = res * (N - i);
        res = res / (i);
        ans.push(res);
    }
    return ans;
}

let N2 = 6;
console.log(nCr(N2)); //  [1, 5, 10, 10, 5, 1]

// ----------------------------------------------------------------
// ----------------------------------------------------------------

// Q. Given N, print the entire triangle N - 6

// Brute force approach
// TC - O(n^3)
// SC - O(1)

let N = 6;
let pascalTriangleList = [];

function nCr(n, r) {
    let res = 1;
    for (let i = 0; i < r; i++) {
        res = res * (n - i);
        res = res / (i + 1);
    }

    return res;
}

for (let row = 1; row <= N; row++) {
    let list = [];
    for (let col = 1; col <= row; col++) {
        list.push(nCr(row - 1, col - 1))
    }
    pascalTriangleList.push(list);
}

console.log(pascalTriangleList);

// ---------------------------------------------

// optimal approach
// TC - O(N^2)
// SC - O(n)
function nCr(row) {
    let ans = [];
    let res = 1;
    ans.push(res)
    for (let i = 1; i < row; i++) {
        res = res * (row - i);
        res = res / (i);
        ans.push(res);
    }
    return ans;
}

let N = 6; // Pascal Triangle length
let pascalTriangleList = [];

for (let row = 1; row <= N; row++) {
    pascalTriangleList.push(nCr(row));
}

console.log(pascalTriangleList);
// output -
// [
//      [1]
//      [1,1]
//      [1,2,1]
//      [1,3,3,1]
//      [1,4,6,4,1]
//      [1,5,10,10,5,1]
// ]
