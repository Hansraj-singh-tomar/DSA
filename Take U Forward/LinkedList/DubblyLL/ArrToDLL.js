class Node {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}
function arrToLL(arr) {
    this.head = this.tail = new Node(arr[0])
    for (let i = 1; i < arr.length; i++) {
        let newNode = new Node(arr[i]);
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }

    return this.head;
}

function print(head) {
    let arr = [];
    while (head) {
        arr.push(head.data);
        head = head.next;
    }

    return arr.join("<->");
}

let arr = [1, 2, 3, 4];
let head = arrToLL(arr);
console.log(print(head)); // 1<->2<->3<->4
