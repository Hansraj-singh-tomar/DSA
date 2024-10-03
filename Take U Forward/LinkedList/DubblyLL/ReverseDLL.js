// Approach - 1 (Using Stack)
class Node {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

function reverseDLL(head) {
    let stack = [];
    let temp = head;
    while (temp != null) {
        stack.push(temp.data);
        temp = temp.next;
    }

    temp = head;

    while (temp != null) {
        temp.data = stack.pop();
        temp = temp.next;
    }

    return head;
}

// Manually creating a doubly linked list
let head = new Node(1);
let second = new Node(2);
let third = new Node(3);
let fourth = new Node(4);
let fifth = new Node(5);

// Linking the nodes together (doubly linked list)
head.next = second;
second.prev = head;
second.next = third;
third.prev = second;
third.next = fourth;
fourth.prev = third;
fourth.next = fifth;
fifth.prev = fourth;

console.log(reverseDLL(head)); // 5 <-> 4 <-> 3 <-> 2 <-> 1


// -----------------------------------------------------------------------

// Approach - 2
// we have to change next to prev and prev to next
// logic of swapping two numbers =>
// last = curr -> prev,
// curr -> prev = curr -> next,
// curr -> next = last
// then,
// curr = curr -> prev

function reverseDLL(head) {
    let curr = head;
    let last = null;
    while (curr !== null) {
        last = curr.prev;
        curr.prev = curr.next;
        curr.next = last;
        curr = curr.prev;
    }

    return last.prev;
}
