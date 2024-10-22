class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}


// Arroach 1
const RootToGivenNodePath = (root, target = null) => {
    if (root === null) {
        return null;
    }
    if (root.data === target) {
        return [root.data];
    }
    let leftPath = RootToGivenNodePath(root.left, target);
    console.log("leftPath", leftPath);

    if (leftPath !== null) {
        leftPath.push(root.data);
        return leftPath;
    }
    let rightPath = RootToGivenNodePath(root.right, target);
    console.log("rightPath", rightPath);

    if (rightPath !== null) {
        rightPath.push(root.data);
        return rightPath;
    }
    return null;
}


// Example tree construction
let root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(5);

root.left.right.left = new Node(6);
root.left.right.right = new Node(7);

console.log(RootToGivenNodePath(root, 7));

// Output: [7,5,2,1] and we have to reverse this path which will be the output 

// Tree -
//           1
//         /  \
//       2     3
//      / \
//     4   5
//        / \
//       6   7


// -----------------------------------------------------------------------

// Another Optimzed Approach
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}


// Arroach 2(optimal approach)

function getPath(root, target, arr) {
    if (root === null) {
        return false;
    }

    arr.push(root.data);

    if (root.data === target) {
        return true;
    }

    if (getPath(root.left, target, arr) || getPath(root.right, target, arr)) {
        return true;
    }

    arr.pop();
    return false;
}

const RootToGivenNodePath = (root, target = null) => {
    let arr = [];
    getPath(root, target, arr);
    return arr;
}



// Example tree construction
let root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(5);

root.left.right.left = new Node(6);
root.left.right.right = new Node(7);

console.log(RootToGivenNodePath(root, 7));

// Output: [1,2,5,7]

// Tree -
//           1
//         /  \
//       2     3
//      / \
//     4   5
//        / \
//       6   7
