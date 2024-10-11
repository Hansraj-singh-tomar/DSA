// Binary Tree Representation

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    addNode(data) {
        const newNode = new Node(data);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        // use a queue to perform level order traversal
        const queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift();

            // Insert as left child if available
            if (current.left === null) {
                current.left = newNode;
                return;
            } else {
                queue.push(current.left);
            }

            // Insert as right child if available
            if (current.right === null) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.right);
            }
        }
    }

    preOrder(root) {
        if (root === null) {
            return;
        }
        let queue = [root];
        let ans = [];
        while (queue.length > 0) {
            const current = queue.shift();
            ans.push(current.data);

            if (current.left) {
                queue.push(current.left);
            }
            if (current.right) {
                queue.push(current.right);
            }
        }
        return ans;
    }

    inOrder(root) {
        if (root === null) {
            return;
        }
        this.inOrder(root.left);
        console.log(root.data);
        this.inOrder(root.right);
    }

    postOrder(root) {
        if (root === null) {
            return;
        }
        this.postOrder(root.left);
        this.postOrder(root.right);
        console.log(root.data);
    }
}

let tree = new BinaryTree();
tree.addNode(1);
tree.addNode(2);
tree.addNode(3);
tree.addNode(4);
tree.addNode(5);
tree.addNode(6);
tree.addNode(7);
tree.addNode(8);
tree.addNode(9);

tree.preOrder(tree.root); // Output: 1 2 4 8 9 5 3 6 7

tree.inOrder(tree.root); // Output: 8 4 9 2 5 1 6 3 7

tree.postOrder(tree.root); // Output: 8 9 4 5 2 6 7 3 1

console.log(tree);
// Output:-
//          1
//        /   \
//       2     3
//      / \   / \
//     4   5 6   7
//    / \
//   8   9