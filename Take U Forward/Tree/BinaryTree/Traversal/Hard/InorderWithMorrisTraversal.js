// Full explanation available in text book
// Count total Nodes in a COMPLETE Binary Tree | O(Log^2 N) Approach
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function InorderWithMorrisTraversal(root) {
    let current = root;
    let prev = null;
    let inOrder = []
    while (current != null) {
        if (current.left == null) {
            // console.log(current.data);
            inOrder.push(current.data);
            current = current.right;
        } else {
            prev = current.left;
            while (prev.right != null && prev.right != current) {
                prev = prev.right;
            }
            if (prev.right == null) {
                prev.right = current;
                current = current.left;
            } else {
                prev.right = null;
                // console.log(current.data);
                inOrder.push(current.data);
                current = current.right;
            }
        }
    }
    return inOrder;
}

let root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(5);

root.left.right.right = new Node(6);

console.log(InorderWithMorrisTraversal(root)); // [4, 2, 5, 6, 1, 3]


// Tree -
//           1
//         /  \
//       2     3
//      / \
//     4   5
//          \
//           6
