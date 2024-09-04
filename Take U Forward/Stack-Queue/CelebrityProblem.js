// Celebrity problem
// Detailed explaination is available in note book.

function Celebrity(arr, row, column) {
    let n = column;
    let knowMe = new Array(column).fill(0);
    let IKnow = new Array(column).fill(0);

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            if (arr[i][j] == 1) {
                knowMe[j]++;
                IKnow[i]++;
            }
        }
    }

    console.log(knowMe); // [1,3,1,0]
    console.log(IKnow); // [2,0,1,2]

    for (let i = 0; i < n; i++) {
        if (knowMe[i] == n - 1 && IKnow[i] == 0) {
            return i;
        }
    }

    return -1;
}

let matrix = [
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
]
let row = matrix.length;
let column = matrix[0].length;
console.log(Celebrity(matrix, row, column)); // 1

// -----------------------------------------------------------------

function Celebrity(matrix) {
    let top = 0; // Start with the first person (top) 
    let bottom = matrix.length - 1; // and the last person (bottom)

    // Process to narrow down the possible celebrity candidate
    while (top < bottom) {
        if (matrix[top][bottom] == 1) {
            // If top knows bottom, top cannot be the celebrity
            top++;
        } else if (matrix[bottom][top] == 1) {
            // If bottom knows top, bottom cannot be the celebrity
            bottom--;
        } else {
            // If both know each other, neither can be a celebrity
            top++;
            bottom--;
        }
    }

    // If the loop exits, we may have a potential celebrity at index 'top' (or 'bottom', since they are the same now)
    if (top > bottom) return -1; // This would mean there is no celebrity

    // Verify if the candidate at index 'top' is actually a celebrity
    if (top == bottom) {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[top][top] == 0) continue; // Skip self-check
            if (matrix[top][i] == 0 && matrix[i][top] == 1) {
                // If the candidate doesn't know i and i knows the candidate, continue checking
            } else {
                // If the candidate knows i or i doesn't know the candidate, then they cannot be a celebrity
                return -1;
            }
        }
        // If we pass all checks, return the index of the celebrity
        return top;
    }
}

let matrix2 = [
    [0, 1, 1, 0], // Person 0 knows Person 1 and 2, doesn't know Person 3
    [0, 0, 0, 0], // Person 1 doesn't know anyone (potential celebrity)
    [0, 1, 0, 0], // Person 2 knows Person 1, doesn't know Person 0 and 3
    [1, 1, 0, 0]  // Person 3 knows Person 0 and 1, doesn't know Person 2
];

console.log(Celebrity(matrix2)); // Output: 1 (Person 1 is the celebrity)

