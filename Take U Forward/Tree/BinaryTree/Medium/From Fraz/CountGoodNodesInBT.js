class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

const CountGoodNodesInBT = (root, max) => {
    if (root == null) {
        return 0;
    }

    let count = 0;

    if (root.data >= max) {
        count++;
        max = root.data;
    }

    return count + CountGoodNodesInBT(root.left, max) + CountGoodNodesInBT(root.right, max);
}

// Example tree construction
let root = new Node(3);

root.left = new Node(1);
root.right = new Node(4);

root.left.left = new Node(3);

root.right.left = new Node(1);
root.right.right = new Node(5);

console.log(CountGoodNodesInBT(root, 0));  // 4