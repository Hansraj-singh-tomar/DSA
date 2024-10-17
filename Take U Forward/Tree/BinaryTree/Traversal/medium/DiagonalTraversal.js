class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function diagonalTraversal(root) {
    if (root == null) return [];

    let map = {}; // To store nodes diagonally
    let queue = [{ node: root, diagonal: 0 }]; // Start BFS with the root at diagonal 0

    while (queue.length > 0) {
        let { node, diagonal } = queue.shift();

        // Add the current node's data to its corresponding diagonal
        if (!map[diagonal]) {
            map[diagonal] = [];
        }
        map[diagonal].push(node.data);

        // If there's a left child, move it to the next diagonal
        if (node.left) {
            queue.push({ node: node.left, diagonal: diagonal + 1 });
        }

        // The right child stays on the same diagonal
        if (node.right) {
            queue.push({ node: node.right, diagonal });
        }
    }

    // Gather the diagonals in order
    let result = [];
    Object.keys(map).sort((a, b) => a - b).forEach(key => {
        result.push(...map[key]);
    });

    return result;
}

// Example binary tree construction
let root = new Node(8);
root.left = new Node(3);
root.right = new Node(10);
root.left.left = new Node(1);
root.left.right = new Node(6);
root.left.right.left = new Node(4);
root.left.right.right = new Node(7);
root.right.right = new Node(14);
root.right.right.left = new Node(13);

console.log(diagonalTraversal(root));  // Output: [8, 10, 14, 3, 6, 7, 13, 1, 4]

// Tree
//         8
//       /  \
//      3    10
//     / \     \
//    1   6     14
//       / \   /
//      4   7 13
