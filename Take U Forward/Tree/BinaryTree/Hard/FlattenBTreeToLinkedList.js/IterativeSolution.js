class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

const IterativeSolution = (root) => {
    let stack = [root];

    while (stack.length !== 0) {
        let curr = stack.pop();

        if (curr.right) {
            stack.push(curr.right);
        }

        if (curr.left) {
            stack.push(curr.left);
        }

        if (stack.length !== 0) {
            curr.right = stack[stack.length - 1];
        }

        curr.left = null;
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

IterativeSolution(root)
console.log(root); // 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7  
