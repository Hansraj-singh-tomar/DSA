class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function SearchingInBST(root, val) {
    while (root !== null && root.data !== val) {
        root = root.data > val ? root.left : root.right;
    }

    return root;
}

// Example tree construction
let root = new Node(10);

root.left = new Node(5);
root.right = new Node(15);

root.left.left = new Node(2);
root.left.right = new Node(7);

console.log(SearchingInBST(root, 1)); // null

console.log(SearchingInBST(root, 7)); // {data: 7, left: null, right: null}

// Tree -
//             10
//            / \
//           5  15
//          / \
//         2   7
