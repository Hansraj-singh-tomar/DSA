class Node {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

function deleteAllOccOfKeyInDLL(head, key) {
    let curr = head;
    while (curr != null) {
        if (curr.data == key) {
            if (curr == head) {
                head = head.next;
                head.prev = null;
            }
            nextNode = curr.next;
            prevNode = curr.prev;
            if (nextNode != null) {
                nextNode.prev = prevNode;
            }
            if (prevNode != null) {
                prevNode.next = nextNode;
            }
            curr = nextNode;
        } else {
            curr = curr.next;
        }
    }
    return head;
}
// Manually creating a doubly linked list
let head = new Node(10);
let second = new Node(4);
let third = new Node(10);
let fourth = new Node(10);
let fifth = new Node(6);
let six = new Node(10);

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

console.log(deleteAllOccOfKeyInDLL(head, 10)); // 5 <-> 4 <-> 3 <-> 2 <-> 1


