class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// TC - O(N)
// SC - O(N)

let prev = null;
const UsingPreOrderRecursion = (root) => {
    if (root === null) {
        return;
    }

    UsingPreOrderRecursion(root.right);
    UsingPreOrderRecursion(root.left);

    // While going back set left and right pointer
    root.right = prev;
    root.left = null;

    prev = root;
}


// Example tree construction
let root = new Node(1);

root.left = new Node(2);
root.right = new Node(5);

root.left.left = new Node(3);
root.left.right = new Node(4);

root.right.right = new Node(6);
root.right.right.left = new Node(7);


UsingPreOrderRecursion(root)
console.log(root); // 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7  
