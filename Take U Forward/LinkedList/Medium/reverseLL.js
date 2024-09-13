// Brute Force approach - Using Stack | TC - O(2n) | SC - O(n)
class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function reverseList(head) {
    let curr = head;
    let stack = [];

    while (curr !== null) {
        stack.push(curr.data);
        curr = curr.next;
    }

    curr = head;
    while (curr !== null) {
        curr.data = stack.pop();
        curr = curr.next;
    }

    return head;
}

let headd = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5)))));
let resultt = reverseList(headd);
console.log(resultt); // { data: 5, next: { data: 4, next: { data: 3, next: { data: 2, next: { data: 1, next: null } } } } }

while (resultt) {
    console.log(resultt.data); // 5, 4, 3, 2, 1
    resultt = resultt.next;
}

// ------------------------------------------------------------------------------------------------------------------------------

// Optimal appraoch - Iterative | TC - O(n) | SC - O(1)
class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function reverseList(head) {
    let curr = head;
    let prev = null;

    while (curr !== null) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
}

let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5)))));
let result = reverseList(head);
console.log(result); // { data: 5, next: { data: 4, next: { data: 3, next: { data: 2, next: { data: 1, next: null } } } } }

while (result) {
    console.log(result.data); // 5, 4, 3, 2, 1
    result = result.next;
}


// ----------------------------------------------------------------------------------------


class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function reverseList(head) {
    if (head == null || head.next == null) {
        return head;
    }

    let newHead = reverseList(head.next);

    let front = head.next;
    front.next = head;
    head.next = null;
    return newHead;
}

let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5)))));
let result = reverseList(head);
console.log(result); // { data: 5, next: { data: 4, next: { data: 3, next: { data: 2, next: { data: 1, next: null } } } } }

while (result) {
    console.log(result.data); // 5, 4, 3, 2, 1
    result = result.next;
}






