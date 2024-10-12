// Time Complexity: O(n)
// Space Complexity: O(n)
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// ------------------------------------------------------------------------

// Brute Approach from Take u forward
// TC - O(n^2)
// SC - O(n)

function findHeight(node) {
    if (node == null) return 0;

    return 1 + Math.max(findHeight(node.left), findHeight(node.right));
}

function check(root) {
    if (node == null) return 0;

    let lh = findHeight(node.left);
    let rh = findHeight(node.right);

    if (Math.abs(lh - rh) > 1) return false;

    let left = check(node.left);
    let right = check(node.right);

    if (!left || !right) return fasle;

    return true;
}

// ------------------------------------------------------------------------

// Optimized code from Take u forward
// TC - O(n)
// SC - O(n)
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

// ------------------------------------------------------------------------

//Another way from coder Army
// TC - O(n)
// SC - O(h)

function height(root) {
    if (root == null) {
        return 0;
    }

    let l = height(root.left);
    let r = height(root.right);

    if (Math.abs(l - r) > 1) {
        valid = 0;
    }

    return 1 + Math.max(l, r);
}
function isBalanced(root) {
    let valid = 1;

    height(root, valid);

    return valid == 1;
}

// -----------------------------------------------------------------------------

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