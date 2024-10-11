// Time Complexity: O(n)
// Space Complexity: O(n)
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function dfsHeight(root) {
    if (root === null) {
        return 0;
    }

    let leftHeight = dfsHeight(root.left);

    if (leftHeight === -1) {
        return -1;
    }

    let rightHeight = dfsHeight(root.right);

    if (rightHeight === -1) {
        return -1;
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
    }

    return (1 + Math.max(leftHeight, rightHeight));
}

function isTreeBalanced(root) {
    if (dfsHeight(root) === -1) {
        return false;
    }
    return true;
}

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.right.left = new Node(4);
root.right.right = new Node(6);
root.right.left.left = new Node(5);
console.log(isTreeBalanced(root)); // false, means it's not a balanced tree

// Tree -
//          1
//        /   \
//       2     3
//            / \
//           4   6
//            \
//             5