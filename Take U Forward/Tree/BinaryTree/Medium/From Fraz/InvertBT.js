class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

const InvertBT = (root) => {
    if (root == null) return;

    InvertBT(root.left);
    InvertBT(root.right);

    let temp = root.left;
    root.left = root.right;
    root.right = temp;

    return root;
}

// Example tree construction
let root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(5);

root.right.left = new Node(6);
root.right.right = new Node(7);

console.log(InvertBT(root));  //

//              1        =>       1
//            /  \               /  \
//           2    3             3    2
//         / \   / \          / \   / \
//        4  5  6   7        7   6 5   4

