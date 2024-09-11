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

    addAt(index, data) {

        if (index < 0 || index > this.size) {
            return;
        }

        let newNode = new Node(data);
        if (index == 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let currentNode = this.head;
            for (let i = 0; i < index - 1; i++) {
                currentNode = currentNode.next;
            }

            newNode.next = currentNode.next;
            currentNode.next = newNode;
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
}

let linkedList = new LinkedList();
linkedList.appendNode(100);
linkedList.appendNode(300);
linkedList.addAt(1, 200);
linkedList.traverseList();  // 100 200 300
