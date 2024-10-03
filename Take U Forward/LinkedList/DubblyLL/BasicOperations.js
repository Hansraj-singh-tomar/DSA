// Doubly Linked List
class Node {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

class DLL {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(data) {
        let newNode = new Node(data)

        if (this.head === null && this.tail === null) {
            this.head = this.tail = newNode;
        }
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }

    prepand(data) {
        let newNode = new Node(data);
        if (this.head === null && this.tail === null) {
            this.head = this.tail = newNode;
        }

        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
    }

    remove(data) {
        if (this.head === null) {
            return;
        }

        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.data === data) {
                if (currentNode === this.head && currentNode === this.tail) {
                    this.head = this.tail = null;
                }
                // if it's the first/head node
                else if (this.head === currentNode) {
                    this.head = this.head.next;
                    this.head.prev = null;
                }
                // If it's the tail/last node
                else if (this.tail === currentNode) {
                    this.tail = this.tail.prev;
                    this.tail.next = null;
                }
                // if it's a middle node
                else {
                    currentNode.prev.next = currentNode.next;
                    currentNode.next.prev = currentNode.prev;
                }
                return;
            }
            currentNode = currentNode.next;
        }
    }


    printList() {
        let currentNode = this.head;
        let result = [];

        while (currentNode) {
            result.push(currentNode.data);
            currentNode = currentNode.next;
        }
        console.log(result.join(" <-> "));
    }
}

let dll = new DLL();
dll.append(1);
dll.append(2);
dll.append(3);
dll.append(4);
dll.append(5);
dll.append(6);

dll.printList(); // 1 <-> 2 <-> 3 <-> 4 <-> 5 <-> 6

dll.prepand(0);

dll.printList(); // 0 <-> 1 <-> 2 <-> 3 <-> 4 <-> 5 <-> 6

dll.remove(1);

dll.printList(); // 0 <-> 2 <-> 3 <-> 4 <-> 5 <-> 6
