class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}


// Optimized approach - Using DFS - reversed preOrder Traversal
// Time Complexity - O(n)
// Space Complexity - O(H) // [0,1,2,3]
function rightViewOfBT(root) {
    let stack = [];
    function dfs(node, level) {
        if (node === null) return;

        // If this is the first node of its level, add it to stack
        if (level === stack.length) {
            stack.push(node.data);
        }

        // Recurse for right subtree first
        dfs(node.right, level + 1);
        // Then recurse for left subtree
        dfs(node.left, level + 1);
    }

    dfs(root, 0);
    return stack;
}

// Brute Approach
// another approach
function rightViewOfBT(root) {
    if (root === null) return [];

    let map = {};  // Map to store the first node at each level
    let queue = [{ node: root, level: 0 }];
    let minLevel = 0, maxLevel = 0;  // To track the range of levels

    while (queue.length > 0) {
        let { node, level } = queue.shift();

        // If this is the first node of its level, add it to the map
        if (!(level in map)) {
            map[level] = node.data;
            minLevel = Math.min(minLevel, level);
            maxLevel = Math.max(maxLevel, level);
        }

        // Enqueue right child first to ensure rightmost nodes are processed first
        if (node.right !== null) {
            queue.push({ node: node.right, level: level + 1 });
        }

        // Enqueue left child
        if (node.left !== null) {
            queue.push({ node: node.left, level: level + 1 });
        }
    }

    // Collect the right view nodes from minLevel to maxLevel
    let result = [];
    for (let i = minLevel; i <= maxLevel; i++) {
        if (map[i] !== undefined) {
            result.push(map[i]);
        }
    }

    return result;
}



// Example tree construction
let root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(5);

root.right.right = new Node(7);

root.left.right.left = new Node(6);

console.log(rightViewOfBT(root));


// Output: [1,3,7,6]

// Tree -
//           1
//         /  \
//       2     3
//      / \     \
//     4   5     7
//        /
//       6   



