// Approach - 1
// Tc - O(2N)
// SC - O(N) + O(N)

class Node {
    constructor(data, next = null, random = null) {
        this.data = data;
        this.next = next;
        this.random = random;
    }
}

function copyRandomList(head) {
    let temp = head;
    let map = new Map;

    while (temp != null) {
        let newNode = new Node(temp.data);
        map.set(temp, newNode);
        temp = temp.next;
    }

    temp = head;
    while (temp != null) {
        let copyNode = map.get(temp);
        copyNode.next = map.get(temp.next);
        copyNode.random = map.get(temp.random);
        temp = temp.next;
    }
    return map.get(head);
}

let head = new Node(7);
let second = new Node(13);
let third = new Node(11);
let fourth = new Node(10);
let fifth = new Node(1);

head.next = second;
head.random = null;

second.next = third;
second.random = head;

third.next = fourth;
third.random = fifth;

fourth.next = fifth;
fourth.random = third;

fifth.next = null;
fifth.random = head;

console.log(copyRandomList(head));

// -------------------------------------------------------------------------------------

// Optimal Approach
// TC - O(3N)
// SC - O(N)

class Node {
    constructor(data, next = null, random = null) {
        this.data = data;
        this.next = next;
        this.random = random;
    }
}

function insertCopyInBtw(head) {
    let temp = head;

    while (temp !== null) {
        let copyNode = new Node(temp.data);
        let next = temp.next;
        temp.next = copyNode;
        copyNode.next = next;
        temp = next;
    }
}

function connectRandomPointers(head) {
    let temp = head;

    while (temp !== null) {
        let copyNode = temp.next;
        if (temp.random !== null) {
            copyNode.random = temp.random.next;
        } else {
            copyNode.random = null;
        }
        temp = temp.next.next; // or temp = copyNode.next
    }
}

function getDeepCopyList(head) {
    let temp = head;
    let dNode = new Node(-1);
    let res = dNode;

    while (temp !== null) {
        res.next = temp.next;
        res = res.next;

        temp.next = temp.next.next;
        temp = temp.next;
    }

    return dNode.next;
}

function copyRandomList(head) {
    insertCopyInBtw(head);
    connectRandomPointers(head);
    return getDeepCopyList(head)
}

let head = new Node(7);
let second = new Node(13);
let third = new Node(11);
let fourth = new Node(10);
let fifth = new Node(1);

head.next = second;
head.random = null;

second.next = third;
second.random = head;

third.next = fourth;
third.random = fifth;

fourth.next = fifth;
fourth.random = third;

fifth.next = null;
fifth.random = head;

console.log(copyRandomList(head));



