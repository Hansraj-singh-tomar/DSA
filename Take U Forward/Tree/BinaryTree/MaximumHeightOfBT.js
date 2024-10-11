// Time Complexity: O(n)
// Space Complexity: O(n) - In worst case
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function HeighOfTree(root) {
    if (root === null) {
        return 0;
    }

    let leftHeight = HeighOfTree(root.left);
    let rightHeight = HeighOfTree(root.right);

    return 1 + Math.max(leftHeight, rightHeight);
}

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.right.left = new Node(4);
root.right.right = new Node(6);
root.right.left.left = new Node(5);
console.log(HeighOfTree(root)); // 4

// Tree -
//          1
//        /   \
//       2     3
//            / \
//           4   6
//          /
//         5
