// Brute force approach - using reverseList | TC - O(3n) | SC - O(1)
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

function AddOne(head) {
    head = reverseList(head);
    let curr = head;
    let carry = 1;
    while (curr !== null) {
        curr.data += carry;
        if (curr.data < 10) {
            carry = 0;
            break;
        } else {
            carry = 1;
            curr.data = 0;
        }
        curr = curr.next;
    }

    if (carry == 1) {
        let newNode = new NodeList(1);
        newNode.next = head;
        head = newNode;
    }
    return reverseList(head);
}


const head = new NodeList(1, new NodeList(5, new NodeList(9)));
console.log(AddOne(head)); // { data: 1, next: { data: 6, next: { data: 0, next: null } } }

// --------------------------------------------------------------------------------------------------

// Optimized approach - without using recursion function | TC - O(n) | SC - O(1)
class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function helper(head) {
    let current = head;

    if (current == null) {
        return 1;
    }

    let carry = helper(current.next);
    current.data += carry;
    if (current.data < 10) {
        return 0;
    } else {
        current.data = 0;
        return 1;
    }
}

function AddOne(head) {
    carry = helper(head);
    if (carry == 1) {
        newNode = new NodeList(carry);
        newNode.next = head;
        return newNode;
    }
    return head;
}

const head = new NodeList(1, new NodeList(5, new NodeList(9)));
console.log(AddOne(head)); // { data: 1, next: { data: 6, next: { data: 0, next: null } } }

