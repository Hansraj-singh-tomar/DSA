// Brute force approach - using stack | isPalindromOrNot - TC - O(n) | SC - O(n)

// Optimal approach - using fast and slow pointer | isPalindromOrNot - TC - O(n) | SC - O(1)
class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}
function reverseList(head) {
    let current = head;
    let prev = null;

    while (current !== null) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    head = prev;
    return head;
}

function palindromOrNot(head) {
    // Part 1 - finding middle of the linked list
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Part 2 - reversing the second half
    let newHead = reverseList(slow);

    // Part 3 - comparing both halves
    let firstHalf = head;
    let secondHalf = newHead;
    while (secondHalf !== null) {
        if (firstHalf.data !== secondHalf.data) {
            reverseList(newHead);
            return false;
        }
        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }
    reverseList(newHead);
    return true;
}

// let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(3, new NodeList(2, new NodeList(1)))))); // true
// let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(2, new NodeList(1))))); // true
let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5))))) // false
console.log(palindromOrNot(head));






