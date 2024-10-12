
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// From Keerti purswani
function getSize(node) {
    if (node == null) return 0;

    return 1 + getSize(node.left) + getSize(node.right);
}

// Another way - from Keerti purswani
function getSize(node) {
    return 1 + (node.left ? getSize(node.left) : 0) + (node.right ? getSize(node.right) : 0);
}

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.right.left = new Node(4);
root.right.right = new Node(6);
root.right.left.left = new Node(5);
console.log(getSize(root)); // 6 (nodes available in the tree)

// Tree -
//          1
//        /   \
//       2     3
//            / \
//           4   6
//            \
//             5

