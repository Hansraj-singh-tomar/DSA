// this approach is slightly better than to brute force approach 
// TC - O(n/2) * 2 => O(n)
// SC - O(1)
class ListNode {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function oddEvenList(head) {
    let odd = head;
    let even = head.next;
    let evenHead = even;

    if (head == null || head.next == null) {
        return head;
    }

    // odd comes first and even comes second in the linked list
    while (even !== null && even.next !== null) {
        odd.next = odd.next.next;
        even.next = even.next.next;

        odd = odd.next;
        even = even.next;
    }

    // another way
    // while (even && even.next) {
    //     odd.next = even.next;
    //     odd = odd.next;

    //     even.next = odd.next;
    //     even = even.next;
    // }

    odd.next = evenHead;
    return head;
}

let head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6))))));

let result = oddEvenList(head); // { data: 1, next: { data: 3, next: { data: 5, next: { data: 2, next: { data: 4, next: { data: 6, next: null } } } } } }

while (result !== null) {
    console.log(result.data); // 1 3 5 2 4 6
    result = result.next;
}
