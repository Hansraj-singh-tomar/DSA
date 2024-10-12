class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function getHeightAndCalculateDiameter(root, maxi) {
    if (root == null) return 0;

    // Get the height of the left and right subtrees
    let lh = getHeightAndCalculateDiameter(root.left, maxi);
    let rh = getHeightAndCalculateDiameter(root.right, maxi);

    // Update the maximum diameter (longest path between two nodes)
    maxi[0] = Math.max(maxi[0], lh + rh);

    // Return the height of the current node
    return 1 + Math.max(lh, rh);
}

function getDiameterOfBinaryTree(root) {
    let maxi = [0];  // Using an array to keep track of maximum diameter, passed by reference
    getHeightAndCalculateDiameter(root, maxi);
    return maxi[0];
}

// Example tree construction
let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.right.left = new Node(4);
root.right.right = new Node(6);
root.right.left.left = new Node(5);
root.right.left.left.left = new Node(9);
root.right.right.right = new Node(7);
root.right.right.right.right = new Node(8);

console.log(getDiameterOfBinaryTree(root));  // Output: 6


// Tree -
//          1
//        /   \
//       2     3
//            / \
//           4   6
//          /     \
//         5       7
//        /         \
//       9           8

