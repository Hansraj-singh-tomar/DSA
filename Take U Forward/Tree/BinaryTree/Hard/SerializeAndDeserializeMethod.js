// Full explanation available in text book
// Count total Nodes in a COMPLETE Binary Tree | O(Log^2 N) Approach
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function serialize(root) {
    if (root === null) {
        return "";
    }

    // let string = `${root.data} ${serialize(root.left)} ${serialize(root.right)}`;

    let queue = [root];
    let result = [];

    while (queue.length > 0) {
        const current = queue.shift();

        if (current) {
            result.push(current.data);
            queue.push(current.left);
            queue.push(current.right);
        } else {
            result.push("#");
        }
    }

    return result.join(",");
}


function deserialize(string) {
    if (string.length === 0) {
        return null;
    }

    let values = string.split(",");
    const root = new Node(parseInt(values.shift()));
    const queue = [root];

    while (queue.length > 0) {
        const current = queue.shift();

        const left = values.shift();
        if (left !== "#") {
            current.left = new Node(parseInt(left));
            queue.push(current.left);
        }

        const right = values.shift();
        if (right !== "#") {
            current.right = new Node(parseInt(right));
            queue.push(current.right);
        }
    }

    return root;
}





// Example usage
let root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.right.left = new Node(4);
root.right.right = new Node(5);

let string = serialize(root)
console.log(deserialize(string));

// Tree -
//           1
//         /  \
//        2    3
//            / \
//           4  5  

