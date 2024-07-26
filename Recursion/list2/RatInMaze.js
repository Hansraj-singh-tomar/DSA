function isSafe(maze, x, y, n, visited) {
    return x >= 0 && x < n && y >= 0 && y < n && maze[x][y] === 1 && !visited[x][y];
}

function solveMaze(maze, x, y, n, path, paths, visited) {
    // If destination is reached, store the path
    if (x === n - 1 && y === n - 1) {
        paths.push(path.slice());
        return;
    }

    // Mark the current cell as visited
    visited[x][y] = true;

    // // Define the possible moves: down, left, right, up
    // const moves = [
    //     { dx: 1, dy: 0, dir: 'D' },
    //     { dx: 0, dy: -1, dir: 'L' },
    //     { dx: 0, dy: 1, dir: 'R' },
    //     { dx: -1, dy: 0, dir: 'U' }
    // ];

    // // Explore all possible moves
    // for (let move of moves) {
    //     const newX = x + move.dx;
    //     const newY = y + move.dy;
    //     if (isSafe(maze, newX, newY, n, visited)) {
    //         path.push(move.dir);
    //         solveMaze(maze, newX, newY, n, path, paths, visited);
    //         path.pop();
    //     }
    // }

    // move - down
    let newX = x + 1;
    let newY = y;
    if (isSafe(maze, newX, newY, n, visited)) {
        // path.push(move.dir);
        path.push('D');
        solveMaze(maze, newX, newY, n, path, paths, visited);
        path.pop();
    }

    // move - left
    newX = x;
    newY = y - 1;
    if (isSafe(maze, newX, newY, n, visited)) {
        path.push('L');
        solveMaze(maze, newX, newY, n, path, paths, visited);
        path.pop();
    }

    // move - right
    newX = x;
    newY = y + 1;
    if (isSafe(maze, newX, newY, n, visited)) {
        path.push('R');
        solveMaze(maze, newX, newY, n, path, paths, visited);
        path.pop();
    }

    // move - up
    newX = x - 1;
    newY = y;
    if (isSafe(maze, newX, newY, n, visited)) {
        path.push('U');
        solveMaze(maze, newX, newY, n, path, paths, visited);
        path.pop();
    }

    // Unmark the current cell as visited (backtracking)
    visited[x][y] = false;
}

function findPaths(maze) {
    const n = maze.length;
    const paths = [];
    const visited = Array.from({ length: n }, () => Array(n).fill(false));

    // if first position is 1 then we have to call that function
    if (maze[0][0] === 1) {
        solveMaze(maze, 0, 0, n, [], paths, visited);
    }

    return paths;
}

// Example usage:
const maze = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 1]
];

const paths = findPaths(maze);
console.log(paths);


// -----------------------------------------------
// how looks visited array
// const n = 4;
// const visited = Array.from({ length: n }, () => Array(n).fill(false));
// console.log(visited);
// // [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]]

// Array.from({length: 3}, () => Array(3).fill(false))