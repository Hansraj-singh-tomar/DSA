class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function childrenSumParent(root) {
    if (root == null) {
        return;
    }

    let child = 0;
    if (root.left != null) {
        child += root.left.data;
    }
    if (root.right != null) {
        child += root.right.data;
    }

    if (child >= root.data) {
        root.data = child;
    } else {
        if (root.left !== null) {
            root.left.data = root.data;
        } else if (root.right != null) {
            root.right.data = root.data;
        }
    }

    childrenSumParent(root.left);
    childrenSumParent(root.right);

    let total = 0;
    if (root.left != null) {
        total += root.left.data;
    }
    if (root.right != null) {
        total += root.right.data;
    }
    if (root.left != null || root.right != null) {
        root.data = total;
    }

    return root;
}



// Example tree construction
let root = new Node(40);

root.left = new Node(10);
root.right = new Node(20);

root.left.left = new Node(2);
root.left.right = new Node(5);

root.right.left = new Node(30);
root.right.right = new Node(40);


console.log(childrenSumParent(root));

// Output:
//          115
//         /   \
//       45     70
//      / \    / \
//     40   5  30  40

// Tree -
//           40
//         /   \
//       10     20
//      / \    / \
//     2   5  30  40

