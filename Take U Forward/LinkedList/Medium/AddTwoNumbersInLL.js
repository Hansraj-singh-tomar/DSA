// Note - Whenever you need to create a newList, always preffer to create a dummy node and then return the next node of dummy node.
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function addTwoNumbers(l1, l2) {
    let dummyNode = new Node(0);
    let current = dummyNode;
    let carry = 0;

    while (l1 !== null || l2 !== null) {
        let sum = carry;

        if (l1) sum += l1.data;
        if (l2) sum += l2.data;

        // Create a new node with the calculated value
        let newNode = new Node(sum % 10);
        current.next = newNode;

        // Move to current node
        current = newNode;

        // calculate the carry
        carry = Math.floor(sum / 10);

        // Move to the next nodes if available
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }

    if (carry > 0) {
        let newNode = new Node(carry);
        current.next = newNode;
        current = newNode;
    }

    // Return the next node of dummy (i.e., the head of the resultant list)
    return dummyNode.next;
}

let l1 = new Node(3, new Node(5));
let l2 = new Node(4, new Node(5, new Node(9, new Node(9))));

// console.log(addTwoNumbers(l1, l2)); // output => {data: 7, next: {data: 0, next: {data: 0, next: {data: 0, next: {data: 1, next: null}}}}}

let sumList = addTwoNumbers(l1, l2);

while (sumList !== null) {
    console.log(sumList.data); // 7 0 0 0 1
    sumList = sumList.next;
}