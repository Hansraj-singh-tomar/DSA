class Node {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}


function removeDupFromSortedDLL(head) {
    let temp = head;

    while (temp !== null && temp.next !== null) {
        let nextNode = temp.next;
        while (nextNode !== null && nextNode.data === temp.data) {
            nextNode = nextNode.next;

        }
        temp.next = nextNode;
        if (nextNode) nextNode.prev = temp;
        temp = temp.next;
    }

    return head;
}

// Manually creating a doubly linked list
let head = new Node(1);
let second = new Node(1);
let third = new Node(1);
let fourth = new Node(2);
let fifth = new Node(3);
let six = new Node(3);
let seven = new Node(4);

// Linking the nodes together (doubly linked list)
head.next = second;

second.prev = head;
second.next = third;

third.prev = second;
third.next = fourth;

fourth.prev = third;
fourth.next = fifth;

fifth.prev = fourth;
fifth.next = six;

six.prev = fifth;
six.next = seven;

seven.prev = six;

console.log(removeDupFromSortedDLL(head));


