class Queue {
    constructor(size) {
        this.queue = new Array(size);
        this.size = size;
        this.front = -1;
        this.rear = -1;
        this.currentSize = 0;
    }

    isFull() {
        return this.currentSize == this.size;
    }

    isEmpty() {
        return this.front == -1 && this.rear == -1;
    }

    enqueue(elm) {
        if (this.isFull()) {
            console.log("Queue is full");

            return;
        }

        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0;
        } else {
            this.rear = (this.rear + 1) % this.size;
        }

        this.queue[this.rear] = elm;
        this.currentSize++;
    }

    dequeue() {
        if (this.isEmpty()) {
            console.log("Queue is empty");
            return
        }

        let elm = this.queue[this.front];
        this.queue[this.front] = null;
        this.front = (this.front + 1) % this.size;
        this.currentSize--;
        return elm;
    }
}

const queue = new Queue(5);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
console.log(queue); // [1,2,3,4,5], front = 0, rear = 4, currentSize = 5
queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.dequeue();
console.log(queue); // [null,null,null,null,null], front = 0, rear = 4, currentSize = 0
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue); // [1,2,3, null, null], front = 0, rear = 2, currentSize = 3

