class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

const dfs = (root, arr) => {
    if (root == null) return 0;

    let left = dfs(root.left, arr);
    let right = dfs(root.right, arr);

    arr.push(root.data + left + right);

    return root.data + left + right;
}

function MaxProductOfSplitedBT(root) {
    let arr = []; // [4,5,11,6,9,21]
    let totalSum = dfs(root, arr);
    let max = 0;
    let mod = Math.pow(10, 9) + 7;
    let res = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        res = arr[i] * (totalSum - arr[i]);
        max = Math.max(res, max);
    }

    return max % mod;
}


// Example tree construction
let root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(5);

root.right.left = new Node(6);

console.log(MaxProductOfSplitedBT(root)); // 110

