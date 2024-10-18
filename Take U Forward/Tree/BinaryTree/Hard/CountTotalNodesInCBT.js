// Full explanation available in text book
// Count total Nodes in a COMPLETE Binary Tree | O(Log^2 N) Approach
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// TC - O((logN)^2)
// SC - O(h)

function getHeightLeft(root) {
    if (root == null) {
        return 0;
    }
    return 1 + getHeightLeft(root.left);
}

function getHeightRight(root) {
    let count = 0;
    while (root.right != null) {
        count++;
        root = root.right;
    }
    return count;
}

function CountTotalNodesInCBT(root) {
    if (root == null) {
        return 0;
    }

    let leftHeight = getHeightLeft(root);
    let rightHeight = getHeightRight(root);

    if (leftHeight == rightHeight) {
        return Math.pow(2, leftHeight) - 1;
    } else {
        return 1 + CountTotalNodesInCBT(root.left) + CountTotalNodesInCBT(root.right);
    }
}



// Example usage
const root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(5);

root.left.left.left = new Node(8);
root.left.left.right = new Node(9);

root.left.right.left = new Node(10);
root.left.right.right = new Node(11);

root.right.left = new Node(6);
root.right.right = new Node(7);


console.log(CountTotalNodesInCBT(root)); // Output: 11

// Tree -
//          1
//        /   \
//       2      3
//      / \    / \
//     4   5  6   7
//    /\   /\
//   8  9 10 11