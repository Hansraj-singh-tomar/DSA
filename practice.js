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
    }


    removeTop() {
        if (this.head == null) {
            return;
        }
        this.head = this.head.next;
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

linkedList.searchNode(200); // true
linkedList.searchNode(500); // false

linkedList.searchNodeByIndex(2); // 200
linkedList.searchNodeByIndex(-1); // undefined

linkedList.traverseList(); // 100 150 200 300

// Search node
// reverse LinkedList

