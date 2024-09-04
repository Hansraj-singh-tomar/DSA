function Celebrity(matrix) {
    let top = 0;
    let bottom = matrix.length - 1;

    while (top < bottom) {
        if (matrix[top][bottom] == 1) {
            top++; // top can't be celebrity
        } else if (matrix[bottom][top] == 1) {
            bottom--; // bottom can't be celebrity
        } else { // when both know each other, means that both can't be celebrity
            top++;
            bottom--;
        }
    }

    if (top > bottom) return -1;

    if (top == bottom) {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[top][top] == 0) continue;
            if (matrix[top][i] == 0 && matrix[i][top] == 1) {

            } else {
                return -1;
            }
        }
        return top;
    }
}

let matrix = [
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0]
];

console.log(Celebrity(matrix));


