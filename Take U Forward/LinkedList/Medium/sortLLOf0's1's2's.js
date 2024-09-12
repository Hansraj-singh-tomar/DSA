// Brute force approach
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

function sortLinkedList(head) {
    if (!head) return head;

    // Initialize counters
    let count0 = 0, count1 = 0, count2 = 0;

    // Count the number of 0's, 1's, and 2's
    let current = head;
    while (current) {
        if (current.val === 0) count0++;
        else if (current.val === 1) count1++;
        else count2++;
        current = current.next;
    }

    // Overwrite the linked list with sorted values
    current = head;
    while (count0 > 0) {
        current.val = 0;
        current = current.next;
        count0--;
    }
    while (count1 > 0) {
        current.val = 1;
        current = current.next;
        count1--;
    }
    while (count2 > 0) {
        current.val = 2;
        current = current.next;
        count2--;
    }

    return head;
}

let head = new ListNode(2, new ListNode(0, new ListNode(1, new ListNode(2, new ListNode(1, new ListNode(0))))));
// Linked List before sorting: 2 -> 0 -> 1 -> 2 -> 1 -> 0

let sortedHead = sortLinkedList(head);
// Linked List after sorting: 0 -> 0 -> 1 -> 1 -> 2 -> 2

while (sortedHead !== null) {
    console.log(sortedHead.val); // Output: 0, 0, 1, 1, 2, 2
    sortedHead = sortedHead.next;
}

// -------------------------------------------------------------------------------------------------------------

// optimal approach
// sort a LL of 0's, 1's, 2's by changing links

class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

function sortLinkedList(head) {
    if (!head || !head.next) return head;

    let zeroHead = new ListNode(-1), zeroCurr = zeroHead;
    let oneHead = new ListNode(-1), oneCurr = oneHead;
    let twoHead = new ListNode(-1), twoCurr = twoHead;

    let current = head;

    while (current !== null) {
        if (current.val === 0) {
            zeroCurr.next = current;
            zeroCurr = zeroCurr.next;
        } else if (current.val === 1) {
            oneCurr.next = current;
            oneCurr = oneCurr.next;
        } else {
            twoCurr.next = current;
            twoCurr = twoCurr.next;
        }
        current = current.next;
    }
    zeroCurr.next = oneHead.next ? oneHead.next : twoHead.next;
    oneCurr.next = twoHead.next;
    twoCurr.next = null;
    return zeroHead.next;
}

let headd = new ListNode(2, new ListNode(0, new ListNode(1, new ListNode(2, new ListNode(1, new ListNode(0))))));

let sortedHeadd = sortLinkedList(headd);
console.log(sortedHeadd); // { data: 0, next: { data: 0, next: { data: 1, next: { data: 1, next: { data: 2, next: { data: 2, next: null } } } } } }

while (sortedHeadd !== null) {
    console.log(sortedHeadd.val); // Output: 0, 0, 1, 1, 2, 2
    sortedHeadd = sortedHeadd.next;
}
