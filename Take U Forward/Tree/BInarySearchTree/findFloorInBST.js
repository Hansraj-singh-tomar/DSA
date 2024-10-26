class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function findFloor(root, key) {
    let floor = -1;

    while (root !== null) {
        if (root.data == key) {
            floor = root.data;
            return floor;
        }

        if (key > root.data) {
            floor = root.data;
            root = root.right;
        } else {
            root = root.left;
        }
    }
    return floor;
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

console.log(findFloor(root, 7)); // 6

// Tree -
//             10
//           /    \
//          5     13
//         / \    / \
//        3   6  11 14
//      / \    \
//     2   4    9



