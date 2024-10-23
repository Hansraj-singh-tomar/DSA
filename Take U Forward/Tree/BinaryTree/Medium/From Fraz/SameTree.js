class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

const SameTree = (root1, root2) => {
    if (root1 == null && root2 == null) {
        return true;
    }

    if (root1 == null || root2 == null) {
        return false;
    }

    if (root1.data != root2.data) {
        return false;
    }

    return SameTree(root1.left, root2.left) && SameTree(root1.right, root2.right);
}

// Example tree construction
let root1 = new Node(1);

root1.left = new Node(2);
root1.right = new Node(3);

// root1.left.right = new Node(5);

let root2 = new Node(1);

root2.left = new Node(2);
root2.right = new Node(3);

// root2.right.left = new Node(5);

console.log(SameTree(root1, root2));  // true