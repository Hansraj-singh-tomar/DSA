// Full explanation available in text book
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function findNodesAtDistanceK(root, target, k) {
    if (!root) return [];

    const graph = new Map();

    // Build the graph (adjacency list)
    function buildGraph(node, parent) {
        if (!node) return;

        if (!graph.has(node)) graph.set(node, []);

        // Connect the node to its parent
        if (parent) {
            graph.get(node).push(parent);
            graph.get(parent).push(node);
        }

        // Recur for left and right children
        buildGraph(node.left, node);
        buildGraph(node.right, node);

        // --------------------------------------------------------

        // if (!node) return;

        // // Connect the node to its parent
        // if (parent) {
        //     if (!graph.has(node)) graph.set(node, []);
        //     graph.get(node).push(parent);
        // }

        // // Connect the node to its left child
        // if (node.left) {
        //     if (!graph.has(node)) graph.set(node, []);
        //     graph.get(node).push(node.left);
        //     buildGraph(node.left, node);
        // }

        // // Connect the node to its right child
        // if (node.right) {
        //     if (!graph.has(node)) graph.set(node, []);
        //     graph.get(node).push(node.right);
        //     buildGraph(node.right, node);
        // }
    }

    buildGraph(root, null);

    // console.log(graph); // {1 => [2, 3], 2 => [1, 4, 5], 3 => [1, 6, 7], 4 => [2], 5 => [2], 6 => [3], 7 => [3]}


    // BFS to find nodes at distance k
    const result = [];
    const queue = [{ node: target, distance: 0 }];
    const visited = new Set([target]);

    while (queue.length > 0) {
        const { node, distance } = queue.shift();

        // If we've reached distance k, add the node to the result
        if (distance === k) {
            result.push(node.data);
        }

        // Traverse neighbors (children and parent)
        for (const neighbor of graph.get(node) || []) { // for(const neighbor of [4,5,1])
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push({ node: neighbor, distance: distance + 1 });
            }
        }
    }

    return result;
}

// Example usage
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.right = new Node(6);
root.right.left = new Node(7);

const targetNode = root.left; // Node with value 2
const k = 2;

console.log(findNodesAtDistanceK(root, targetNode, k)); // Output: [3]

// Tree -
//          1
//        /   \
//       2      3
//      / \    / \
//     4   5  6   7