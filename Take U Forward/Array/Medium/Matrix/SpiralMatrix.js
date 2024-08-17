let matrix = [
    [1, 2, 3, 4, 5, 6],
    [20, 21, 22, 23, 24, 7],
    [19, 32, 33, 34, 25, 8],
    [18, 31, 36, 35, 26, 9],
    [17, 30, 29, 28, 27, 10],
    [16, 15, 14, 13, 12, 11],
]

// move to right -> bottom -> left -> top
// top - 0, left - 0, right - 5, bottom - 5
// for(i - left ---> right) => a[top][i] after the iteration top++
// for(i - top ---> bottom) => a[i][right] after the iteration right--
// for(i - right ---> left) => a[bottom][i] after the iteration bottom--
// for(i - bottom ---> top) => a[i][left] after the iteration left++

let row = matrix.length;
let col = matrix[0].length;

let left = 0;
let right = col - 1;
// let top = 0;
let start = 0
let bottom = row - 1;

let ans = [];

while (left <= right && start <= bottom) {
    // move left - right
    for (let i = left; i <= right; i++) {
        ans.push(matrix[start][i]);
    }
    start++;

    // move top -> bottom
    for (let i = start; i <= bottom; i++) {
        ans.push(matrix[i][right]);
    }
    right--;

    // move right -> left
    if (start <= bottom) {
        for (let i = right; i >= left; i--) {
            ans.push(matrix[bottom][i]);
        }
        bottom--;
    }

    // move bottom -> top
    if (left <= right) {
        for (let i = bottom; i >= start; i--) {
            ans.push(matrix[i][left]);
        }
        left++;
    }
}

console.log(ans);

// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]