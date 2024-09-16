// Delete the middle Node of the Linked List

// Approach : 1
// TC - O(n+n/2) | SC - O(1)
class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function deleteMiddleNodeOfLL(head) {
    let current = head;
    let n = 0;
    while (current !== null) {
        current = current.next;
        n++;
    }
    let middle = Math.floor(n / 2)

    current = head;
    for (let i = 0; i < middle - 1; i++) {
        current = current.next;
    }
    current.next = current.next.next;
    return head;
}

let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5)))))
// let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4)))) // { data: 1, next: { data: 2, next: { data: 4, next: null } } } 

console.log(deleteMiddleNodeOfLL(head)); // { data: 1, next: { data: 2, next: { data: 4, next: { data: 5, next: null } } } }


// ---------------------------------------------------------------------------------------------------------------------------

// Approach : 2
// TC - O(n/2) | SC - O(1)

class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function deleteMiddleNodeOfLL(head) {

    if (head == null || head.next == null) return head;

    let slow = head;
    let fast = head;

    // we are skipping the slow pointer 
    fast = fast.next.next;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    slow.next = slow.next.next;
    return head;
}

let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5)))))
// let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4)))) // { data: 1, next: { data: 2, next: { data: 4, next: null } } } 

console.log(deleteMiddleNodeOfLL(head)); // { data: 1, next: { data: 2, next: { data: 4, next: { data: 5, next: null } } } }







