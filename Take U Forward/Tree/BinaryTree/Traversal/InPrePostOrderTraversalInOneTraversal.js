// Binary Tree Representation

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {

    constructor(root = null) {
        this.root = root;
    }

    preInPostTraversal(root) {
        let preOrder = [];
        let inOrder = [];
        let postOrder = [];
        let stack = [];

        if (root == null) {
            return null
        }

        stack.push({ node: root, num: 1 });

        while (stack.length > 0) {

            let temp = stack.pop();

            // This is a part of PreOrder
            // increment 1 to 2
            // push the left side of the tree
            if (temp.num == 1) {
                preOrder.push(temp.node.data);
                temp.num++;
                stack.push(temp);
                if (temp.node.left != null) {
                    stack.push({ node: temp.node.left, num: 1 });
                }
            }
            // This is a part of InOrder
            // increment 2 to 3
            // push right
            else if (temp.num == 2) {
                inOrder.push(temp.node.data);
                temp.num++;
                stack.push(temp);
                if (temp.node.right != null) {
                    stack.push({ node: temp.node.right, num: 1 });
                }
            }
            // don't push it back again in stack
            else {
                postOrder.push(temp.node.data);
            }
        }

        return [preOrder, inOrder, postOrder];
    }
}

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(5);
root.left.left = new Node(3);
root.left.right = new Node(4);
root.right.left = new Node(6);
root.right.right = new Node(7);

let tree = new BinaryTree(root);
console.log(tree.preInPostTraversal(tree.root));

// preOrder - [1, 2, 3, 4, 5, 6, 7]
// inOrder - [3, 2, 4, 1, 6, 5, 7]
// postOrder - [3, 4, 2, 6, 7, 5, 1]

// Output:-
//          1
//        /   \
//       2     5
//      / \   / \
//     3   4 6   7

