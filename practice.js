// Delete the middle Node of the Linked List

class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function startingPointOfLoopInLL(head) {
    let slow = head;
    let fast = head;

    // while (fast !== null && fast.next !== null) {
    //     slow = slow.next;
    //     fast = fast.next.next;
    //     if (slow == fast) {
    //         break;
    //     }
    // }
    // slow = head;

    // while (slow != fast) {
    //     slow = slow.next;
    //     fast = fast.next;
    // }
    // return slow;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            slow = head;
            while (slow != fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
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

console.log(startingPointOfLoopInLL(head)); // { data: 3, next: { data: 4, next: { data: 5, next: { data: 6, next: { data: 7, next: { data: 8, next: { data: 9, next: null } } } } } } }

// i have been reached half of it.
// and start doing job, conccurently i must do
// 