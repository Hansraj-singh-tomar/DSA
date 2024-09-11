class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    appendNode(data) {
        let newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
}

let linkedList = new LinkedList();
linkedList.appendNode(100);
linkedList.appendNode(200);
linkedList.appendNode(300);

console.log(linkedList); // { head: { data: 100, next: { data: 200, next: { data: 300, next: null } } }, tail: { data: 300, next: null }, size: 3 }
