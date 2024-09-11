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

    traverseList() {
        let currentNode = this.head;
        while (currentNode) {
            console.log(currentNode.data);
            currentNode = currentNode.next;
        }
    }

    removeTop() {
        if (this.head == null) {
            return;
        }
        this.head = this.head.next;
        this.size--;
    }

    removeLast() {
        if (this.head == null) {
            return;
        }
        if (this.head.next == null) {
            this.head = null;
            return;
        }
        let currentNode = this.head;
        while (currentNode.next.next != null) {
            currentNode = currentNode.next;
        }
        currentNode.next = null;
        this.size--;
    }

}

let linkedList = new LinkedList();
linkedList.appendNode(100);
linkedList.appendNode(150);
linkedList.appendNode(200);
linkedList.appendNode(300);
linkedList.removeTop(); // remove - 100
linkedList.removeLast(); // remove - 300
linkedList.traverseList(); // 150 200
