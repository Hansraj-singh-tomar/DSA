class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function findCeilInBST(root, key) {

    let ceil = -1;

    while (root !== null) {
        if (root.data == key) {
            ceil = root.data;
            return ceil;
        }

        if (key > root.data) {
            root = root.right;
        } else {
            ceil = root.data;
            root = root.left;
        }
    }

    return ceil;
}

// using Recursion 
function findCeilInBST(root, key, ceil = -1) {
    if (root == null) {
        return ceil;
    }

    if (root.data === key) {
        return root.data;
    }

    if (key < root.data) {
        return findCeilInBST(root.left, key, root.data);
    } else {
        return findCeilInBST(root.right, key, ceil);
    }
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

console.log(findCeilInBST(root, 8)); // 9

// Tree -
//             10
//           /    \
//          5     13
//         / \    / \
//        3   6  11 14
//      / \    \
//     2   4    9