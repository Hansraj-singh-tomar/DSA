class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}


function detectLoop(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true; // Loop detected
        }
    }

    return false; // No loop detected
}

// Example LinkedList with a loop: 1 -> 2 -> 3 -> 4 -> 5 -> 2 (loop)
let node5 = new NodeList(5);
let node4 = new NodeList(4, node5);
let node3 = new NodeList(3, node4);
let node2 = new NodeList(2, node3);
let head = new NodeList(1, node2);

// Creating a loop by connecting node5 to node2
node5.next = node2;

console.log(detectLoop(head)); // true (loop detected)




