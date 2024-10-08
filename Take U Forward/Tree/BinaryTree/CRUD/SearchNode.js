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

    search(data) {
        if (this.root === null) {
            return false;
        }

        // use a queue to perform level order traversal
        const queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift();

            if (current.data === data) {
                return true;
            }

            if (current.left !== null) {
                queue.push(current.left);
            }

            if (current.right !== null) {
                queue.push(current.right);
            }
        }

        return false;
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

console.log(tree.search(10)); // false
console.log(tree.search(6)); // true

console.log(tree);

// Output:-
//          1
//        /   \
//       2     3
//      / \   / \
//     4   5 6   7
//    / \
//   8   9