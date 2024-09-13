class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function RemoveNthNodeFromEnd(head, N) {
    let fast = head;

    // fast pointer will move N steps ahead
    for (let i = 0; i < N; i++) {
        fast = fast.next;
    }

    // if N = 5 and length of LL is also 5 then fast will be null
    if (fast == null) {
        return head.next;
    }

    let slow = head;

    // fast and slow pointer will move one step at a time simultaneously
    while (fast.next !== null) {
        slow = slow.next;
        fast = fast.next;
    }


    // delete the node
    let deleteNode = slow.next;
    slow.next = slow.next.next;
    return head;
}

let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5)))));
let N = 2
let result = RemoveNthNodeFromEnd(head, N);
console.log(result); // { data: 1, next: { data: 2, next: { data: 3, next: { data: 5, next: null } } } }

while (result) {
    console.log(result.data); // 1 2 3 5
    result = result.next;
}
