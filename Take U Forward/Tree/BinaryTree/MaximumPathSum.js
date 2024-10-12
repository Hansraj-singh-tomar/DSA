class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function calculateMaxPathSum(root, maxSum) {
    if (root == null) {
        return 0;
    }

    let leftMaxSum = Math.max(0, calculateMaxPathSum(root.left, maxSum)); // if left sum is negative then set it to 0
    let rightMaxSum = Math.max(0, calculateMaxPathSum(root.right, maxSum)); // if right sum is negative then set it to 0

    // while backTracking
    maxSum[0] = Math.max(maxSum[0], root.data + leftMaxSum + rightMaxSum);

    return root.data + Math.max(leftMaxSum, rightMaxSum);
}

function MaximumPathSum(root) {
    let maxSum = [0];
    calculateMaxPathSum(root, maxSum);
    return maxSum[0];
}

// Example tree construction
let root = new Node(-10);

root.left = new Node(9);
root.right = new Node(20);

root.right.left = new Node(15);
root.right.right = new Node(7);

console.log(MaximumPathSum(root));  // Output: 42 (15 + 20 + 7)


// Tree -
//          -10
//        /    \
//       9     20
//            /  \
//           15   7
