class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function checkIdenticalOrNot(root1, root2) {
    if (root1 == null && root2 == null) {   // Both trees are empty
        return true;
    }
    if (root1 == null || root2 == null) {   // One tree is empty
        return false;
    }
    return (root1.data == root2.data && checkIdenticalOrNot(root1.left, root2.left) && checkIdenticalOrNot(root1.right, root2.right));
}

// Example tree construction
let root1 = new Node(1);

root1.left = new Node(2);
root1.right = new Node(3);

root1.right.left = new Node(4);
root1.right.right = new Node(5);

let root2 = new Node(1);

root2.left = new Node(2);
root2.right = new Node(3);

root2.right.left = new Node(4);
root2.right.right = new Node(5);

console.log(checkIdenticalOrNot(root1, root2));  // true


// Tree - 1
//          1
//        /   \
//       2     3
//            /  \
//           4    5

// Tree - 2
//          1
//        /   \
//       2     3
//            /  \
//           4    5
