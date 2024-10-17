class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Brute force code
function verticalOrderTraversal(root) {
    if (root == null) return [];

    let map = {};  // Map to store nodes at each horizontal distance
    let queue = [{ node: root, hd: 0, row: 0 }];  // Queue to store nodes and their horizontal distances

    // Perform level order traversal (BFS) while keeping track of horizontal distances
    while (queue.length > 0) {
        let { node, hd, row } = queue.shift();

        // Add node to the corresponding horizontal distance in the map
        if (!map[hd]) {
            map[hd] = [];
        }
        // Push the node's value and row together
        map[hd].push({ data: node.data, row: row });

        // Add left and right children to the queue with updated horizontal distances
        if (node.left != null) {
            queue.push({ node: node.left, hd: hd - 1, row: row + 1 });
        }
        if (node.right != null) {
            queue.push({ node: node.right, hd: hd + 1, row: row + 1 });
        }
    }

    // Sort horizontal distances
    // instead of minHd => -1 and maxHd = 2, we can use sort map keys 
    let sortedKeys = Object.keys(map).sort((a, b) => a - b);

    let result = [];

    // Sort nodes by row and value in each vertical level
    for (let key of sortedKeys) {
        map[key].sort((a, b) => {
            if (a.row === b.row) {
                return a.data - b.data;  // Sort by value if rows are the same
            }
            return a.row - b.row;  // Sort by row (level)
        });

        // Extract only the values (sorted by row and value) for the result
        result.push(map[key].map(item => item.data));
    }

    return result;
}


// Optimized Code 
function verticalOrderTraversal(root) {

    if (root == null) return [];

    let map = {};  // Map to store nodes at each horizontal distance and their rows
    let queue = [{ node: root, hd: 0, row: 0 }];  // Queue to store nodes, their horizontal distances, and row numbers
    let minHd = 0, maxHd = 0;  // Track min and max horizontal distance

    // Perform level order traversal (BFS) while keeping track of horizontal distances and row (level)
    while (queue.length > 0) {
        let { node, hd, row } = queue.shift();

        // Add node to the corresponding horizontal distance in the map with row
        if (!map[hd]) {
            map[hd] = [];
        }
        map[hd].push({ data: node.data, row: row });

        // Track min and max horizontal distance
        minHd = Math.min(minHd, hd);
        maxHd = Math.max(maxHd, hd);

        // Add left and right children to the queue with updated horizontal distances and rows
        if (node.left != null) {
            queue.push({ node: node.left, hd: hd - 1, row: row + 1 });
        }
        if (node.right != null) {
            queue.push({ node: node.right, hd: hd + 1, row: row + 1 });
        }
    }

    // Iterate from minHd to maxHd to collect nodes in vertical order
    let result = [];
    for (let hd = minHd; hd <= maxHd; hd++) {
        if (map[hd]) {
            // Sort nodes first by row (level), then by value if rows are the same
            map[hd].sort((a, b) => {
                if (a.row === b.row) {
                    return a.data - b.data;  // Sort by value if the row is the same
                }
                return a.row - b.row;  // Sort by row (level)
            });

            // Collect the sorted values
            let sortedValues = map[hd].map(item => item.data);
            result.push(sortedValues);
        }
    }

    return result;
}

// Example tree construction
let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(10);

root.right.left = new Node(9);
root.right.right = new Node(10);

root.left.left.right = new Node(5);
root.left.left.right.right = new Node(6);

console.log(verticalOrderTraversal(root));

// Output: [[4], [2, 5], [1, 9, 10, 6], [3], [10]]

// Tree -
//           1
//        /     \
//       2       3
//      / \     / \
//     4   10  9   10
//      \
//       5
//        \
//         6