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

    removeAt(index) {
        if (index < 0 || index > this.size) {
            return;
        }

        if (index == 0) {
            this.head = this.head.next;
        } else {
            let currentNode = this.head;
            for (let i = 0; i < index - 1; i++) {
                currentNode = currentNode.next;
            }

            currentNode.next = currentNode.next.next;
        }

        this.size--;
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
linkedList.appendNode(150);
linkedList.appendNode(200);
linkedList.appendNode(300);
linkedList.removeAt(1);
linkedList.traverseList();  // 100 200 300
