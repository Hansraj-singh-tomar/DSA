// Reverse Linked List in Group of Given Size k
class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

// function to reverse the linked list
function reverseList(head) {
    let temp = head;
    let prev = null;

    while (temp !== null) {
        let next = temp.next;
        temp.next = prev;
        prev = temp;
        temp = next;
    }

    return prev;
}

// function to find/get the kth node from given position in the linked list
function findKthNode(head, k) {
    let temp = head;
    while (k - 1 > 0 && temp !== null) {
        temp = temp.next;
        k--;
    }
    return temp;
}

function KReverse(head, k) {

    // Initialize a temporary node
    let curr = head; // node to traverse the list
    let nextNode = null;

    // Pointer to track the last node of the previous group
    let prevGroupLastNode = null;

    // Traverse list until we reach the end of the list
    while (curr !== null) {
        // Get the kth node of the current group
        let kthNode = findKthNode(curr, k);

        // If the kth node is null (means, not a complete group)
        if (kthNode === null) {
            // If there was a previous group, link the last node to the current node
            if (prevGroupLastNode) {
                prevGroupLastNode.next = curr;
            }

            // exit the loop
            break;
        }

        // store the next node of the kth node
        nextNode = kthNode.next;

        // disconnect the kth node from the list, with that we can reverse the group
        kthNode.next = null;

        // reverse the group from temp to kth node
        reverseList(curr);

        // Adjust the head if the reversal starts from the head
        if (curr == head) {
            head = kthNode;
        } else {
            // link the prevGroupLastNode to the kthNode
            prevGroupLastNode.next = kthNode;
        }

        // update the pointer to the last node of the previous group
        prevGroupLastNode = curr;

        // move to the next group
        curr = nextNode;
    }

    // return the head of the modified linked list
    return head;
}

let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5, new NodeList(6, new NodeList(7, new NodeList(8, new NodeList(9, new NodeList(10, null))))))))));
console.log(KReverse(head, 3)); // { data: 3, next: { data: 2, next: { data: 1, next: { data: 6, next: { data: 5, next: { data: 4, next: { data: 9, next: { data: 8, next: { data: 7, next: { data: 10, next: null } } } } } } } } }

