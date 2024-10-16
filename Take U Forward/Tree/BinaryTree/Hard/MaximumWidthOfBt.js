class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class TreeNode {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Approach 1 - Brute approach
// function MaximumWidthOfBinaryTree(root) {
//     if (root == null) {
//         return 0;
//     }

//     let queue = [{ node: root, index: 0 }];

//     let maxWidth = 0;

//     while (queue.length > 0) {
//         let count = queue.length;
//         let minIndex = queue[0].index;
//         let maxIndex = queue[count - 1].index;

//         // calculate max width
//         maxWidth = Math.max(maxWidth, maxIndex - minIndex + 1);


//         for (let i = 0; i < count; i++) {
//             let { node, index } = queue.shift();

//             // Enqueue left child with the position 2 * index
//             if (node.left != null) {
//                 queue.push({ node: node.left, index: index * 2 });
//             }

//             // Enqueue right child with the position 2 * index + 1
//             if (node.right != null) {
//                 queue.push({ node: node.right, index: index * 2 + 1 });
//             }
//         }
//     }
//     return maxWidth;
// }

// Approach 2 - Optimized approach
function MaximumWidthOfBinaryTree(root) {
    if (root == null) return 0;

    let maxWidth = 0;
    let queue = [{ node: root, index: 0 }];  // BFS queue storing nodes and their index

    while (queue.length > 0) {
        let size = queue.length;
        let minIndex = queue[0].index;  // Minimum index at the current level
        let first = 0, last = 0;  // Track first and last indices at the current level

        for (let i = 0; i < size; i++) {
            let { node, index } = queue.shift();
            index = index - minIndex;  // Normalize index to avoid overflow

            // Store the first and last indices
            if (i == 0) first = index;
            if (i == size - 1) last = index;

            // Enqueue left child with the position 2 * index
            if (node.left != null) {
                queue.push({ node: node.left, index: 2 * index });
            }
            // Enqueue right child with the position 2 * index + 1
            if (node.right != null) {
                queue.push({ node: node.right, index: 2 * index + 1 });
            }
        }

        // Update maxWidth
        maxWidth = Math.max(maxWidth, last - first + 1);
    }

    return maxWidth;

}


// Example tree construction
let root = new Node(1);

root.left = new Node(3);
root.right = new Node(7);

root.left.left = new Node(8);
// root.left.right = new Node(5);

// root.right.left = new Node(8);
root.right.right = new Node(4);

// root.left.right.left = new Node(6);
// root.left.right.right = new Node(7);

console.log(MaximumWidthOfBinaryTree(root));

// Output: 4 // maxWidth must be between two nodes

// Tree -
//           1
//         /   \
//       3      7
//      /        \
//     8          4

