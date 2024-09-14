class NodeList {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

function firstCommonNode(head1, head2) {
    let stack = [];
    let current = head1;

    while (current !== null) {
        stack.push(current, 1);
        current = current.next;
    }

    temp = head2;
    while (temp !== null) {
        if (stack[current] === temp) {
            return temp;
        } else {
            temp = temp.next;
        }
    }

    return null;
}

let head1 = new NodeList(3, new NodeList(1, new NodeList(4, new NodeList(6, new NodeList(2)))));
let head2 = new NodeList(1, new NodeList(2, new NodeList(4, new NodeList(5, new NodeList(4, new NodeList(6, new NodeList(2)))))))

console.log(firstCommonNode(head1, head2));