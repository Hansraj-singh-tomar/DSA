// Merge Two sorted LL

class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function mergeTwoSortedLL(head1, head2) {
    let t1 = head1;
    let t2 = head2;
    let dNode = new NodeList(-1);
    let temp = dNode;

    while (t1 !== null && t2 !== null) {
        if (t1.data < t2.data) {
            temp.next = t1;
            temp = t1;
            t1 = t1.next;
        } else {
            temp.next = t2;
            temp = t2;
            t2 = t2.next;
        }
    }
    if (t1) {
        temp.next = t1;
    } else {
        temp.next = t2;
    }

    return dNode.next;
}

let head1 = new NodeList(2, new NodeList(4, new NodeList(8, new NodeList(10))));
let head2 = new NodeList(1, new NodeList(3, new NodeList(3, new NodeList(6, new NodeList(11, new NodeList(14))))));
console.log(mergeTwoSortedLL(head1, head2)); // { data: 1, next: { data: 2, next: { data: 3, next: { data: 3, next: { data: 6, next: { data: 8, next: { data: 10, next: { data: 11, next: { data: 14, next: null } } } } } } } } }