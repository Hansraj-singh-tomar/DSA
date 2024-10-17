// TC - O(n)
// left boundary hight of tree - o(H)
// right boundary height of tree - o(H)
// normal traversal will take O(n)
// SC - O(n)
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function isLeaf(node) {
    if (node.left == null && node.right == null) {
        return true;
    } else {
        return false;
    }
}

function addLeftBoundary(node, ans) {
    let curr = node.left;
    while (curr != null) {
        if (isLeaf(curr) == false) {
            ans.push(curr.data);
        }
        if (curr.left != null) {
            curr = curr.left;
        } else {
            curr = curr.right;
        }
    }
}

function addLeaves(node, ans) {
    if (isLeaf(node)) {
        ans.push(node.data);
        return;
    }
    if (node.left != null) {
        addLeaves(node.left, ans);
    }
    if (node.right != null) {
        addLeaves(node.right, ans);
    }
}

function addRightBoundary(node, ans) {
    let curr = node.right;
    let stack = [];
    while (curr != null) {
        if (isLeaf(curr) == false) {
            stack.push(curr.data);
        }
        if (curr.right != null) {
            curr = curr.right;
        } else {
            curr = curr.left;
        }
    }
    while (stack.length > 0) {
        ans.push(stack.pop());
    }
}

function BoundaryTraversal(root) {
    let ans = [];
    if (root == null) {
        return ans;
    }

    if (isLeaf(root)) {
        ans.push(root.data);
        return ans;
    }

    ans.push(root.data);
    addLeftBoundary(root, ans);
    addLeaves(root, ans);
    addRightBoundary(root, ans);
    return ans;
}


// Example tree construction
let root = new Node(1);

root.left = new Node(2);
root.right = new Node(7);

root.left.left = new Node(3);
root.left.left.right = new Node(4);
root.left.left.right.left = new Node(5);
root.left.left.right.right = new Node(6);

root.right.right = new Node(8);
root.right.right.left = new Node(9);
root.right.right.left.left = new Node(10);
root.right.right.left.right = new Node(11);


console.log(BoundaryTraversal(root)); // [1, 2, 3, 4, 5, 6, 10, 11, 9, 8, 7]
// Tree -
//          1
//        /   \
//       2     7
//     /        \
//    3          8
//     \        /
//      4      9
//     /\     /\
//    5  6   10 11