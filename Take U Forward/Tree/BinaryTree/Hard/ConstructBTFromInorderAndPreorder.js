// Full explanation available in text book
// Construct Binary Tree from Inorder and Preorder Traversal
// TC - O(n), SC - O(n) 

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function BuildTree(inOrder, preOrder, inStart, inEnd, preStart, preEnd, map) {
    if (inStart > inEnd || preStart > preEnd) {
        return null;
    }
    let rootData = preOrder[preStart];
    let root = new Node(rootData);

    let rootIndex = map.get(rootData);
    let leftSize = rootIndex - inStart;

    root.left = BuildTree(inOrder, preOrder, inStart, rootIndex - 1, preStart + 1, preStart + leftSize, map);
    root.right = BuildTree(inOrder, preOrder, rootIndex + 1, inEnd, preStart + leftSize + 1, preEnd, map);
    return root;
}

function ConstructBTFromInorderAndPreorder(inOrder, preOrder) {
    let map = new Map();
    for (let i = 0; i < inOrder.length; i++) {
        map.set(inOrder[i], i);
    }
    let root = BuildTree(inOrder, preOrder, 0, inOrder.length - 1, 0, preOrder.length - 1, map);
    return root;
}


// Example usage
const inOrder = [40, 20, 50, 10, 60, 30];
const preOrder = [10, 20, 40, 50, 30, 60];


console.log(ConstructBTFromInorderAndPreorder(inOrder, preOrder));

// Tree -
//           10
//         /   \
//       20    30
//      / \    /
//    40  50  60   
