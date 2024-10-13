class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function verticalOrderTraversal(root) {
    if (root == null) return [];

    let map = {};  // Map to store nodes at each horizontal distance
    let queue = [{ node: root, hd: 0 }];  // Queue to store nodes and their horizontal distances
    let minHd = 0, maxHd = 0;  // Track min and max horizontal distance

    // Perform level order traversal (BFS) while keeping track of horizontal distances
    while (queue.length > 0) {
        let { node, hd } = queue.shift();

        // Add node to the corresponding horizontal distance in the map
        if (!map[hd]) {
            map[hd] = [];
        }
        map[hd].push(node.data);

        // Track min and max horizontal distance
        minHd = Math.min(minHd, hd);
        maxHd = Math.max(maxHd, hd);

        // Add left and right children to the queue with updated horizontal distances
        if (node.left != null) {
            queue.push({ node: node.left, hd: hd - 1 });
        }
        if (node.right != null) {
            queue.push({ node: node.right, hd: hd + 1 });
        }
    }

    // Iterate from minHd to maxHd to collect nodes in vertical order
    let result = [];
    for (let hd = minHd; hd <= maxHd; hd++) {
        if (map[hd]) {
            console.log(map[hd]);

            result.push(map[hd]);
        }
    }

    return result;
}

// Example tree construction
let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);

console.log(verticalOrderTraversal(root));
