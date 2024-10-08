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

    deleteNode(value) {
        if (this.root === null) return false;

        let nodeToDelete = null;
        let deepestNode = null;
        let parentOfDeepest = null;

        // Initialize queue with the root and no parent
        const queue = [{ node: this.root, parent: null }];

        while (queue.length > 0) {
            const { node, parent } = queue.shift();

            // Check if current node is the node to delete
            if (node.data === value) {
                nodeToDelete = node;
            }

            // Enqueue left child if it exists
            if (node.left !== null) {
                queue.push({ node: node.left, parent: node });
            }

            // Enqueue right child if it exists
            if (node.right !== null) {
                queue.push({ node: node.right, parent: node });
            }

            // Keep track of the last node and its parent
            deepestNode = node;
            parentOfDeepest = parent;
        }

        if (nodeToDelete !== null) {
            // Replace nodeToDelete's data with deepestNode's data
            nodeToDelete.data = deepestNode.data;

            // Remove the deepest node from its parent
            if (parentOfDeepest !== null) {
                if (parentOfDeepest.left === deepestNode) {
                    parentOfDeepest.left = null;
                } else if (parentOfDeepest.right === deepestNode) {
                    parentOfDeepest.right = null;
                }
            } else {
                // If parentOfDeepest is null, it means the tree had only one node
                this.root = null;
            }

            return true;
        }

        // Node with the value not found
        return false;
    }

    printTree(node = this.root, prefix = '', isLeft = true) {
        if (node !== null) {
            console.log(prefix + (isLeft ? '├── ' : '└── ') + node.data);
            this.printTree(node.left, prefix + (isLeft ? '│   ' : '    '), true);
            this.printTree(node.right, prefix + (isLeft ? '│   ' : '    '), false);
        }
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

tree.deleteNode(3);

tree.printTree();

console.log(tree);
// Output:-
//          1
//        /   \
//       2     9
//      / \   / \
//     4   5 6   7
//    / \
//   8   null
