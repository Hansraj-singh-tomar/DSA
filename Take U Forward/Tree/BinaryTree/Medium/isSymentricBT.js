class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function dfs(left, right) {
    // Case 1: If both subtrees are null, it's symmetric (base case)
    if (left === null && right === null) {
        return true;
    }

    // Case 2: If one subtree is null and the other is not, it's not symmetric
    if (left === null || right === null) {
        return false;
    }

    // Case 3: If the values of current nodes are not equal, it's not symmetric
    if (left.data !== right.data) {
        return false;
    }

    // Recursively check:
    // 1. The left child of the left subtree with the right child of the right subtree
    // 2. The right child of the left subtree with the left child of the right subtree
    return dfs(left.left, right.right) && dfs(left.right, right.left);
}

function symentricBT(root) {
    // If the tree is empty, it's symmetric
    if (root == null) {
        return true;
    }

    // Check symmetry between the left and right subtrees
    return dfs(root.left, root.right);
}

// Example tree construction
let root = new Node(1);

root.left = new Node(2);
root.right = new Node(2);

// root.left.right = new Node(3);
// root.right.right = new Node(3);

root.left.left = new Node(3);
root.left.right = new Node(4);

root.right.left = new Node(4);
root.right.right = new Node(3);

console.log(symentricBT(root));

// Output: true

// Tree -
//           1
//         /   \
//       2      2
//      / \    / \
//     3   4  4   3
