// Intersection Point of two linked list in Y direction 
// TC - O(n) | SC - O(N)
class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function firstCommonNode(head1, head2) {
    let map = new Map();

    let current = head1;
    while (current !== null) {
        map.set(current, 1);
        current = current.next;
    }

    current = head2;
    while (current !== null) {
        if (map.has(current)) {
            return current;
        }
        current = current.next;
    }
    return null;
}

// Create common nodes
let commonNode = new NodeList(8, new NodeList(4, new NodeList(5)));

// Create first linked list: 4 -> 1 -> 8 -> 4 -> 5
let head1 = new NodeList(4, new NodeList(1, commonNode));

// Create second linked list: 5 -> 6 -> 1 -> 8 -> 4 -> 5
let head2 = new NodeList(5, new NodeList(6, new NodeList(1, commonNode)));

// Alert:- This is wrong way to do define common node in linked list 
// let head1 = new NodeList(4, new NodeList(1, new NodeList(8, new NodeList(4, new NodeList(5)))));
// let head2 = new NodeList(5, new NodeList(6, new NodeList(1, new NodeList(8, new NodeList(4, new NodeList(5))))));


console.log(firstCommonNode(head1), (head2)); // { data: 8, next: { data: 4, next: { data: 5, next: null } } }


// -----------------------------------------------------------------------------------------------------

// optimized solution | TC - O(n) | SC - O(1)

class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function getLength(head) {
    let length = 0;
    let current = head;
    while (current !== null) {
        length++;
        current = current.next;
    }
    return length;
}

function firstCommonNode(head1, head2) {
    let len1 = getLength(head1);
    let len2 = getLength(head2);

    // Align both linked lists by moving the pointer of the longer list forward
    let diff = Math.abs(len1 - len2);

    if (len1 > len2) {
        for (let i = 0; i < diff; i++) {
            head1 = head1.next;
        }
    } else {
        for (let i = 0; i < diff; i++) {
            head2 = head2.next;
        }
    }

    // Now, traverse both lists together and find the intersection
    while (head1 !== null && head2 !== null) {
        if (head1 === head2) {  // Reference comparison (same node in memory)
            return head1;
        }
        head1 = head1.next;
        head2 = head2.next;
    }

    return null; // If no intersection is found
}

// Test case
let commonNode = new NodeList(6, new NodeList(2));

// Creating first linked list: 3 -> 1 -> 4 -> 6 -> 2
let head1 = new NodeList(3, new NodeList(1, new NodeList(4, commonNode)));

// Creating second linked list: 1 -> 2 -> 4 -> 5 -> 4 -> 6 -> 2 (common node starts at 6)
let head2 = new NodeList(1, new NodeList(2, new NodeList(4, new NodeList(5, new NodeList(4, commonNode)))));


// This is wrong way
// let head1 = new NodeList(4, new NodeList(1, new NodeList(8, new NodeList(4, new NodeList(5)))));
// let head2 = new NodeList(5, new NodeList(6, new NodeList(1, new NodeList(8, new NodeList(4, new NodeList(5))))));


let result = firstCommonNode(head1, head2);

if (result !== null) {
    console.log("First common node found at value:", result); // { data: 6, next: { data: 2, next: null } }
} else {
    console.log("No common node found.");
}

// --------------------------------------------------------------------------------------

// Optimal solution | TC - O(n) or O(2n) | SC - O(1)
class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function firstCommonNode(head1, head2) {
    let temp1 = head1;
    let temp2 = head2;

    while (temp1 !== temp2) {
        temp1 = (temp1 === null) ? head2 : temp1.next;
        temp2 = (temp2 === null) ? head1 : temp2.next;
    }

    while (temp1 !== null) {
        if (temp1 === temp2) {
            return temp1;
        }
        temp1 = temp1.next;
        temp2 = temp2.next;
    }

    // intead of two while loops we can wrap it up in one while loop
    // while (temp1 !== temp2) {
    //     temp1 = temp1.next;
    //     temp2 = temp2.next;

    //     if (temp1 === temp2) {
    //         return temp1;
    //     }

    //     if (temp1 === null) {
    //         temp1 = head2;
    //     }
    //     if (temp2 === null) {
    //         temp2 = head1;
    //     }
    // }
    // return null;
}

// Test case
let commonNode = new NodeList(6, new NodeList(2));

// Creating first linked list: 3 -> 1 -> 4 -> 6 -> 2
let head1 = new NodeList(3, new NodeList(1, new NodeList(4, commonNode)));

// Creating second linked list: 1 -> 2 -> 4 -> 5 -> 4 -> 6 -> 2 (common node starts at 6)
let head2 = new NodeList(1, new NodeList(2, new NodeList(4, new NodeList(5, new NodeList(4, commonNode)))));

let result = firstCommonNode(head1, head2);

if (result !== null) {
    console.log("First common node found at value:", result); // { data: 6, next: { data: 2, next: null } }
} else {
    console.log("No common node found.");
}




