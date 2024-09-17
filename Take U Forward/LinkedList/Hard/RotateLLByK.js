// Rotate Linked List by k times

// TC(2n) | SC - O(1)
// Full Explanation - https://takeuforward.org/data-structure/rotate-a-linked-list-k-times/
class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function findNthNode(head, n) {
    let temp = head;
    while (n - 1 > 0 && temp !== null) {
        temp = temp.next;
        n--;
    }
    return temp;
}

// function to reverse the linked list
function rotateLLByK(head, k) {
    let tail = head;
    let length = 1;

    while (tail.next !== null) {
        tail = tail.next;
        length++;
    }

    if (k % length === 0) {
        return head;
    }

    k = k % length;
    tail.next = head;

    let newLastNode = findNthNode(head, length - k);
    head = newLastNode.next;
    newLastNode.next = null;
    return head;
}


let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5)))));
console.log(rotateLLByK(head, 2)); // { data: 4, next: { data: 5, next: { data: 1, next: { data: 2, next: { data: 3, next: null } } } } }