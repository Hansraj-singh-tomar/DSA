class Stack {
    constructor() {
        this.queue1 = [];
        this.queue2 = [];
    }

    // Push an element onto the stack
    push(value) {
        this.queue1.push(value);
    }

    // Pop the top element off the stack and return it
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }

        // Move all elements except the last one from queue1 to queue2
        while (this.queue1.length > 1) {
            this.queue2.push(this.queue1.shift());
        }

        // The last element of queue1 is the top of the stack
        const topElement = this.queue1.shift();

        // Swap queue1 and queue2
        [this.queue1, this.queue2] = [this.queue2, this.queue1];

        return topElement;
    }

    // Peek at the top element of the stack without removing it
    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }

        return this.queue1[this.queue1.length - 1];
    }

    // Check if the stack is empty
    isEmpty() {
        return this.queue1.length === 0;
    }

    display() {
        return this.queue1;
    }
}

// Example usage:
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.peek());   // Output: 3
console.log(stack.pop());    // Output: 3
console.log(stack.peek());   // Output: 2
console.log(stack.isEmpty()); // Output: false
console.log(stack.display()); // [1,2]

