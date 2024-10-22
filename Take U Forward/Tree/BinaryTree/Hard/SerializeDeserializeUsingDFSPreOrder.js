// Full explanation available in text book
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function serialize(root) {
    if (root == null) {
        return '#';
    }

    return `${root.data},${serialize(root.left)},${serialize(root.right)}`
}

function deserialize(str) {
    const nodes = str.split(",")

    function buildTree() {
        const value = nodes.shift();

        if (value == "#") {
            return null;
        }

        const newNode = new Node(parseInt(value));

        newNode.left = buildTree();
        newNode.right = buildTree();

        return newNode;
    }

    return buildTree();
}

let root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.right.left = new Node(4);
root.right.right = new Node(5);

let serializeStr = serialize(root);
console.log(serializeStr); // 1,2,#,#,3,4,#,#,5,#,#
console.log(deserialize(serializeStr));


// Tree -
//           1
//         /  \
//       2     3
//            / \
//           4   5

