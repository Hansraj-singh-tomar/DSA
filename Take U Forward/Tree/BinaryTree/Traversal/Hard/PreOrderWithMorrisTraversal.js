// Full explanation available in text book
// Count total Nodes in a COMPLETE Binary Tree | O(Log^2 N) Approach
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function PreorderWithMorrisTraversal(root) {
    let current = root;
    let prev = null;
    let preOrder = [];
    while (current != null) {
        if (current.left == null) {
            preOrder.push(current.data);
            current = current.right;
        } else {
            prev = current.left;
            while (prev.right != null) {
                prev = prev.right;
            }
            prev.right = curr.right;
            curr.right = curr.left;
            curr.left = null;
        }
    }
    return preOrder;
}

let root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(5);

root.left.right.right = new Node(6);

console.log(PreorderWithMorrisTraversal(root)); // [1,2,4,5,6,3]


// Tree -
//           1
//         /  \
//       2     3
//      / \
//     4   5
//          \
//           6
