class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Brute force approach
// Time Complexity - O(nLogn)
function TopViewOfBT(root) {

    let map = {};
    let queue = [];
    queue.push({ node: root, level: 0 });
    while (queue.length > 0) {

        let { node, level } = queue.shift();

        if (!map[level]) {
            map[level] = node.data;
        }
        if (node.left) {
            queue.push({ node: node.left, level: level - 1 });
        }
        if (node.right) {
            queue.push({ node: node.right, level: level + 1 });
        }
    }

    let sortedKeys = Object.keys(map).sort((a, b) => a - b);

    let result = [];
    for (let key of sortedKeys) {
        result.push(map[key]);
    }

    return result;
}

// Optimized approach
// Time Complexity - O(n)
function TopViewOfBT(root) {
    if (!root) return [];

    let map = {};  // Map to store the first node at each horizontal distance
    let queue = [{ node: root, Hd: 0 }];  // Queue for BFS traversal with horizontal distance
    let minHd = 0, maxHd = 0;  // Track minimum and maximum horizontal distance

    // Perform level order traversal (BFS)
    while (queue.length > 0) {
        let { node, Hd } = queue.shift();

        // Only add the first node at this horizontal distance to the map
        if (!(Hd in map)) { // Hd not in map
            map[Hd] = node.data;
            minHd = Math.min(minHd, Hd);
            maxHd = Math.max(maxHd, Hd);
        }

        if (node.left != null) {
            queue.push({ node: node.left, Hd: Hd - 1 });
        }
        if (node.right != null) {
            queue.push({ node: node.right, Hd: Hd + 1 });
        }
    }

    // Collect the result from minLevel to maxLevel without sorting
    let result = [];
    for (let i = minHd; i <= maxHd; i++) {
        result.push(map[i]);
    }

    return result;
}


// Example tree construction
let root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(5);
root.left.right.left = new Node(6);

root.right.right = new Node(7);

console.log(TopViewOfBT(root));


// Output: [4, 2, 1, 3, 7]

// Tree -
//           1
//        /     \
//       2       3
//      / \       \
//     4   5       7
//        /
//       6