class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(elm) {
        let newNode = new Node(elm);
        // if the list is empty
        if (!this.head) {
            this.head = newNode;
            return;
        }

        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
    }
}
let arr = [1, 2, 3, 4, 5];

let ll = new LinkedList();

for (let elm of arr) {
    ll.append(elm);
}

console.log(ll); // {data: 1, next: {data: 2, next: {data: 3, next: {data: 4, next: {data: 5, next: null}}}}}
