class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function findMid(head) {
    let slow = head;
    let fast = head.next;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

function merge(head1, head2) {
    if (head1 == null) {
        return head2;
    }
    if (head2 == null) {
        return head1;
    }

    let dummyNode = new Node(-1);
    let temp = dummyNode;

    while (head1 != null && head2 != null) {
        if (head1.data < head2.data) {
            temp.next = head1;
            head1 = head1.next;
        } else {
            temp.next = head2;
            head2 = head2.next;
        }
        temp = temp.next;
    }
    if (head1 != null) {
        temp.next = head1;
    }
    if (head2 != null) {
        temp.next = head2;
    }
    return dummyNode.next;
}

function sortLL(head) {
    if (head == null || head.next == null) {
        return head;
    }

    let mid = findMid(head);

    let leftHead = head;
    let rightHead = mid.next;
    mid.next = null;

    leftHead = sortLL(leftHead);
    rightHead = sortLL(rightHead);

    return merge(leftHead, rightHead);
}

let head = new Node(3, new Node(2, new Node(5, new Node(4, new Node(1)))));
console.log(sortLL(head)); // 1->2->3->4->5