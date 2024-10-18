// Full explanation available in text books
// Construct Binary Tree from InOrder and PostOrder Traversal
// TC - O(n), SC - O(n) 
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function BuildTree(inOrder, postOrder, inStart, inEnd, postStart, postEnd, map) {
    if (inStart > inEnd || postStart > postEnd) {
        return null;
    }
    let rootData = postOrder[postEnd];
    let root = new Node(rootData);

    let rootIndex = map.get(rootData);
    let leftSize = rootIndex - inStart;

    root.left = BuildTree(inOrder, postOrder, inStart, rootIndex - 1, postStart, postStart + leftSize - 1, map);
    root.right = BuildTree(inOrder, postOrder, rootIndex + 1, inEnd, postStart + leftSize, postEnd - 1, map);
    return root;
}

function ConstructBTFromInorderAndPostorder(inOrder, postOrder) {
    let map = new Map();
    for (let i = 0; i < inOrder.length; i++) {
        map.set(inOrder[i], i);
    }
    let root = BuildTree(inOrder, postOrder, 0, inOrder.length - 1, 0, postOrder.length - 1, map);
    return root;
}


// Example usage
const inOrder = [40, 20, 50, 10, 60, 30];
const postOrder = [40, 50, 20, 60, 30, 10];

console.log(ConstructBTFromInorderAndPostorder(inOrder, postOrder));

// Tree -
//           10
//         /   \
//       20    30
//      / \    /
//    40  50  60   
