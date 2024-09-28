class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function findNthNode(head, n) {
    let temp = head;
    while (n > 0) {
        n--;
        temp = temp.next;
    }
    return temp;
}

function reverseNodesInKGroups(head, k) {
    let curr = head;
    let nextNode = null;
    let prevGroupLastNode = null;

    let kthNode = findNthNode(head, k);

    kthNode.next = null;

    reverseList(curr);
}

let head = new NodeList(1, new NodeList(2, new NodeList(3, new NodeList(4, new NodeList(5, new NodeList(6, new NodeList(7, new NodeList(8, new NodeList(9, new NodeList(10))))))))));

console.log(reverseNodesInKGroups(head, 3));
