class Queue {
    maxSize;
    queue = [];

    constructor(size) {
        this.maxSize = size;
        this.currentSize = this.queue.length;
    }

    isEmpty() {
        return this.queue.length == 0;
    }

    isFull() {
        return this.currentSize >= this.maxSize;
    }

    enqueue(x) {
        if (this.isFull()) {
            throw new Error("queue is full")
        }
        this.queue.push(x);
        this.currentSize++;
    }


    dequeue() {
        if (this.isEmpty()) {
            throw new Error("queue is empty");
        }
        this.queue.shift();
        this.currentSize--;
    }

    peak() {
        if (this.isEmpty()) {
            throw new Error("queue is empty");
        }

        return this.queue[0];
    }

    display() {
        return this.queue;
    }
}

let queue = new Queue(5);

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
queue.dequeue();
console.log(queue.peak()); // 2
console.log(queue.display()); // [2,3,4,5]
console.log(queue);  // Queue {maxSize: 5, queue: Array(4), start: undefined, end: undefined, currentSize: 4}


// -------------------------------------------------------------------------------
// from striver - TUF

// class Queue {
//     currentSize;
//     maxSize;

//     constructor(size) {
//         this.queue = Array(size);
//         this.maxSize = size;
//         this.currentSize = 0;
//     }

//     push(x) {
//         if (this.currentSize == this.maxSize) {
//             throw new Error("queue is full")
//         }

//         if (this.currentSize == 0) {
//             this.start = 0;
//             this.end = 0;
//         } else {
//             this.end = (this.end + 1) % this.maxSize
//         }
//         this.queue[this.end] = x;
//         this.currentSize++;
//     }

//     pop() {
//         if (this.currentSize == 0) {
//             throw new Error("queue is empty");
//         }

//         this.el = this.queue[this.start];

//         if (this.currentSize == 1) {
//             this.start = -1;
//             this.end = -1
//         } else {
//             this.start = (this.start + 1) % this.maxSize;
//         }

//         this.currentSize--;
//         return this.el;
//     }

//     peak() {
//         if (this.currentSize == 0) {
//             throw new Error("queue is empty")
//         }

//         return this.queue[this.start]
//     }

//     display() {
//         return this.queue;
//     }
// }

// let queue = new Queue(5);
// queue.push(1);
// queue.push(2);
// queue.push(3);
// queue.push(4);
// queue.push(5);

// console.log(queue.pop()); // 1

// console.log(queue.peak()); // 2

// console.log(queue.display()); // [1,2,3,4,5]
// console.log(queue);

