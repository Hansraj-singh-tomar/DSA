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

function lowestCommonAncestor(root, p, q) {
    // Base case: If root is null, or root is p or q, return root
    if (root === null || root.data === p || root.data === q) {
        return root;
    }

    // Search for p and q in the left subtree
    let left = lowestCommonAncestor(root.left, p, q);
    // Search for p and q in the right subtree
    let right = lowestCommonAncestor(root.right, p, q);

    // while coming back - it had a left and right 

    // first way
    // If both left and right are non-null, root is the LCA
    if (left !== null && right !== null) {
        return root.data;
    }
    // Otherwise, return the non-null result (either left or right)
    return left !== null ? left : right;

    // second way
    // if (left == null) {
    //     return right;
    // } else if (right == null) {
    //     return left;
    // } else {
    //     return root;
    // }
}


// Example tree construction
let root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(5);

root.right.left = new Node(8);
root.right.right = new Node(9);

root.left.right.left = new Node(6);
root.left.right.right = new Node(7);

console.log(lowestCommonAncestor(root, 4, 7));

// Output: 2

// Tree -
//           1
//         /   \
//       2      3
//      / \    / \
//     4   5  8   9
//        / \
//       6   7


