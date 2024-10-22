class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

const UsingMorishTraversal = (root) => {
    let curr = root;
    let prev = null;
    let inOrder = [];

    while (curr !== null) {
        if (curr.left == null) {
            inOrder.push(curr.data);
            curr = curr.right;
        } else {
            prev = curr.left;
            while (prev.right !== null) {
                prev = prev.right;
            }
            if (prev.right == null) {
                prev.right = curr;
                curr = curr.left;
            } else {
                prev.right = null;
                inOrder.push(curr.data);

            }
        }
    }
}


// Example tree construction
let root = new Node(1);

root.left = new Node(2);
root.right = new Node(5);

root.left.left = new Node(3);
root.left.right = new Node(4);

root.right.right = new Node(6);
root.right.right.left = new Node(7);

UsingMorishTraversal(root)
console.log(root); 