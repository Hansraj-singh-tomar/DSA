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

    // Search Node By Value
    searchNode(data) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.data == data) {
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    }

    // Search Node By Index
    searchNodeByIndex(index) {
        if (index < 0 || index > this.size) {
            return;
        }
        let currentNode = this.head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode.data;
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

console.log(linkedList.searchNode(150)); // true

console.log(linkedList.searchNode(250)); // false

console.log(linkedList.searchNodeByIndex(2)); // 200

console.log(linkedList.searchNodeByIndex(5)); // undefined

console.log(linkedList.searchNodeByIndex(-1)); // undefined

linkedList.traverseList(); // 100 150 200 300