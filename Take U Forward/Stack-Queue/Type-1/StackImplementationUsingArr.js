// Stack - LIFO(last in first out)


class Stack {
    stack = [];
    maxSize;
    currentSize;

    constructor(size) {
        this.maxSize = size;
        this.currentSize = this.stack.length;
    }

    isStackFull() {
        return this.currentSize >= this.maxSize
    }

    isStackEmpty() {
        return this.stack.length === 0;
    }

    push(x) {
        if (this.isStackFull()) {
            throw new Error("stack is full")
        }
        this.stack.push(x);
        this.currentSize++;
    }

    pop() {
        if (this.isStackEmpty()) {
            throw new Error("stack is empty");
        }
        this.stack.pop();
        this.currentSize--;
    }

    peak() {
        return this.stack[this.stack.length - 1]; // we can't do like that - this.stack.pop()
    }

    display() {
        return this.stack;
    }
}

let stack = new Stack(5);

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
stack.pop();
console.log(stack.peak()); // 4
console.log(stack.display()); // [1,2,3,4]
console.log(stack); // {stack: Array(4), maxSize: 5, currentSize: 4}
