class Queue {
    maxSize;
    currentSize;
    stack1 = [];
    stack2 = [];

    constructor(size) {
        this.maxSize = size;
        this.currentSize = 0;
    }

    isFull() {
        return this.currentSize >= this.maxSize;
    }

    isEmpty() {
        return this.stack1.length == 0;
    }

    push(x) {
        if (this.isFull()) {
            throw new Error("queue is full")
        }

        this.stack1.push(x);
        this.currentSize++;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("queue is empty");
        }

        while (this.stack1.length > 1) {
            this.stack2.push(this.stack1.pop());
        }

        let topElement = this.stack1.pop();

        while (this.stack2.length >= 1) {
            this.stack1.push(this.stack2.pop())
        }
        this.currentSize--;
        return topElement
    }

    top() {
        if (this.isEmpty()) {
            throw new Error("stack is empty")
        }

        return this.stack1[0];
    }

    display() {
        return this.stack1;
    }
}

let queue = new Queue(5);
queue.push(1)
queue.push(2)
queue.push(3)
queue.push(4)
queue.push(5);

console.log(queue.pop()); // 1

console.log(queue.top()); // 2

queue.push(6)

console.log(queue.pop()); // 2

console.log(queue.display()); // [3,4,5,6]
