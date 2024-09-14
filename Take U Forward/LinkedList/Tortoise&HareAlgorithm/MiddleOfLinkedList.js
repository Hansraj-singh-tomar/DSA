// Middle of the linked List

// Brute Force approach
// TC - O(n + n/2)
// SC - O(1)


class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function middleOfLinkedList(head) {
    let curr = head;
    let count = 0;

    while (curr !== null) {
        curr = curr.next;
        count++;
    }

    let middle = Math.floor(count / 2);
    curr = head;

    while (middle > 0) {
        curr = curr.next;
        middle--;
    }

    return curr;
}

// let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5)))));
let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5, new NodeList(6))))));
console.log(middleOfLinkedList(head)); // { data: 3, next: { data: 4, next: { data: 5, next: null } } }


// --------------------------------------------------------------------------------------------

// using tortoise and hare algorithm - in that we will use slow and fast pointer
// TC - O(n)
// SC - O(1)

class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function middleOfLinkedList(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

let headd = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5)))));
// let headd = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5, new NodeList(6))))));
console.log(middleOfLinkedList(headd)); // { data: 3, next: { data: 4, next: { data: 5, next: null } } }





