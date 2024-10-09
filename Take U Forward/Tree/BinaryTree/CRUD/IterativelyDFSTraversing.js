// Binary Tree Representation

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
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

        let stack = [root];
        let result = [];

        while (stack.length > 0) {
            const current = stack.pop();
            result.push(current.data);
            // console.log(current.data);
            if (current.right) {
                stack.push(current.right);
            }
            if (current.left) {
                stack.push(current.left);
            }
        }

        return result;
    }

    inOrder(root) {
        if (root === null) {
            return;
        }

        let stack = [];
        let result = [];

        let current = root;

        while (stack.length > 0 || current !== null) {
            // Traverse left subtree
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }

            // visit the node 
            current = stack.pop();
            result.push(current.data);

            // Traverse right subtree
            current = current.right;
        }

        return result;

    }

    // using two stack
    // postOrder(root) {
    //     if (root === null) {
    //         return [];
    //     }

    //     let stack1 = [];
    //     let stack2 = [];

    //     let result = [];

    //     stack1.push(root);

    //     while (stack1.length > 0) {
    //         let current = stack1.pop();

    //         stack2.push(current?.data);

    //         if (current?.left) {
    //             stack1.push(current?.left);
    //         }
    //         if (current?.right) {
    //             stack1.push(current?.right);
    //         }
    //     }

    //     while (stack2.length > 0) {
    //         result.push(stack2.pop());
    //     }

    //     return result;
    // }

    // using one stack 
    postOrder(root) {
        let stack = [];
        let result = [];

        let current = root;

        while (current != null || stack.length > 0) {
            if (current !== null) {
                stack.push(current);
                current = current.left;
            } else {
                let temp = stack[stack.length - 1].right;
                if (temp === null) {
                    temp = stack[stack.length - 1];
                    stack.pop();
                    result.push(temp.data);
                    while (stack.length > 0 && temp === stack[stack.length - 1].right) {
                        temp = stack.pop();
                        result.push(temp.data);
                    }
                } else {
                    current = temp;
                }
            }
        }
        return result;
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

console.log("preOrder traversal", tree.preOrder(tree.root)); // Output: [1 2 4 8 9 5 3 6 7]

console.log("inOrder traversal", tree.inOrder(tree.root)); // Output: [8 4 9 2 5 1 6 3 7]

console.log("postOrder traversal", tree.postOrder(tree.root)); // Output: [8 9 4 5 2 6 7 3 1]

console.log(tree);
// Output:-
//          1
//        /   \
//       2     3
//      / \   / \
//     4   5 6   7
//    / \
//   8   9
