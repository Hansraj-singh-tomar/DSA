class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function ZigZagTraversal(root) {

    if (root == null) {
        return [];
    }

    let queue = [root]; // Queue to store nodes at each level 
    let leftToRight = true; // flaf to indicate the traversal direction
    let result = [];

    while (queue.length > 0) {
        let levelSize = queue.length;
        let currentLevelNode = [];

        for (let i = 1; i <= levelSize; i++) {
            let currentNode = queue.shift();

            // Add nodes based on the current direction 
            if (leftToRight) {
                currentLevelNode.push(currentNode.data);
            } else {
                currentLevelNode.unshift(currentNode.data);
            }


            // Add child nodes to the queue
            if (currentNode.left) {
                queue.push(currentNode.left);
            }

            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }

        // Add the current level to the result
        result.push(currentLevelNode);

        // Toggle direction
        leftToRight = !leftToRight;
    }

    return result;
}


// Example tree construction
let root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(5);

root.right.right = new Node(6);

console.log(ZigZagTraversal(root)); // [[1], [3,2], [4,5,6]]


// Tree -
//          1
//        /   \
//       2     3
//     /  \     \
//    4    5     6
