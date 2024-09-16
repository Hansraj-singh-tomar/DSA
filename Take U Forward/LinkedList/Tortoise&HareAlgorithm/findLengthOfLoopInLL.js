// Find the length of a loop in a linked list

// Approach 1: Using HashMap
class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}


function findLengthOfLoop(head) {
    let map = new Map();
    let current = head;
    let timer = 1;

    while (current !== null) {
        console.log(map);
        if (map.has(current)) {
            let value = map.get(current);
            return timer - value;
        }
        map.set(current, timer);
        current = current.next;
        timer++;
    }

    return false;
}

// Example LinkedList with a loop: 1->2->3->4->5->6->7->8->9->3(loop)
let node9 = new NodeList(9);
let node8 = new NodeList(8, node9);
let node7 = new NodeList(7, node8);
let node6 = new NodeList(6, node7);
let node5 = new NodeList(5, node6);
let node4 = new NodeList(4, node5);
let node3 = new NodeList(3, node4);
let node2 = new NodeList(2, node3);
let head = new NodeList(1, node2);

// Creating a loop by connecting node9 to node3
node9.next = node3;

console.log(findLengthOfLoop(head)); // 7

// -------------------------------------------------------------------------

// Approach 2: Using slow and fast pointers
// TC - O(n) | SC - O(1)

class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function findLengthOfLoop(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            // fast == slow means we found a loop and calculate the length of the loop
            let count = 1;
            slow = slow.next;
            while (slow !== fast) {
                slow = slow.next;
                count++;
            }

            return count;
        }
    }

    return false;
}

// Example LinkedList with a loop: 1->2->3->4->5->6->7->8->9->3(loop)
let node9 = new NodeList(9);
let node8 = new NodeList(8, node9);
let node7 = new NodeList(7, node8);
let node6 = new NodeList(6, node7);
let node5 = new NodeList(5, node6);
let node4 = new NodeList(4, node5);
let node3 = new NodeList(3, node4);
let node2 = new NodeList(2, node3);
let head = new NodeList(1, node2);

// Creating a loop by connecting node9 to node3
node9.next = node3;

console.log(findLengthOfLoop(head)); // 7



