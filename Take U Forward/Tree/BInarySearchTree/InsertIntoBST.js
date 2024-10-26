class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function InsertIntoBST(root, val) {
    if (root == null) return new Node(val);

    let curr = root;

    while (true) {
        if (val < curr.data) {
            // Move to the left
            if (curr.left !== null) {
                curr = curr.left;
            } else {
                curr.left = new Node(val);
                break;
            }
        } else {
            // Move to the right
            if (curr.right !== null) {
                curr = curr.right;
            } else {
                curr.right = new Node(val);
                break;
            }
        }
    }

    return root;
}



// Example tree construction
let root = new Node(10);

root.left = new Node(5);
root.right = new Node(13);

root.left.left = new Node(3);
root.left.right = new Node(6);

root.right.left = new Node(11);
root.right.right = new Node(14);

root.left.left.left = new Node(2);
root.left.left.right = new Node(4);

root.left.right.right = new Node(9);

console.log(InsertIntoBST(root, 7));

// Tree -
//             10
//           /    \
//          5     13
//         / \    / \
//        3   6  11 14
//      / \    \
//     2   4    9
//             /
//            7



