// Implement Min Stack

function MinStack() {
    this.stack = [];
}

MinStack.prototype.push = function (val) {
    if (this.stack.length === 0) {
        this.stack.push({ value: val, min: val })
    } else {
        this.stack.push({ value: val, min: Math.min(val, this.getMin()) });
    }
};

MinStack.prototype.pop = function () {
    this.stack.pop();
}

MinStack.prototype.top = function () {
    if (this.stack.length !== 0) {
        return this.stack[this.stack.length - 1].value;
    }
    return null;
}

MinStack.prototype.getMin = function () {
    if (this.stack.length !== 0) {
        return this.stack[this.stack.length - 1].min;
    }
    return null;
}

MinStack.prototype.display = function () {
    return this.stack;
}

let stack = new MinStack();

stack.push(5);
stack.push(10);
stack.push(3);
stack.push(7);

console.log(stack.getMin()); // 3

stack.pop();
console.log(stack.getMin()); // 3

stack.pop();
console.log(stack.getMin()); // 5

console.log(stack.display()); // [{value: 5, min: 5}, {value: 10, min: 5}]

// ----------------------------------------------------------------------------------------


// using ES-6 classes
// In that we will store value in the form of {key,value}

class MinStack {
    constructor() {
        this.stack = [];
    }

    push(val) {
        let currentMin = this.stack.length === 0 ? val : this.getMin();
        this.stack.push({ value: val, min: Math.min(val, currentMin) });
    }

    pop() {
        if (this.stack.length !== 0) {
            this.stack.pop();
        }
    }

    top() {
        if (this.stack.length !== 0) {
            return this.stack[this.stack.length - 1].value;
        }
        return null; // or throw an error if you want to handle underflow
    }

    getMin() {
        if (this.stack.length !== 0) {
            return this.stack[this.stack.length - 1].min;
        }
        return null; // or throw an error if you want to handle underflow
    }
}

// Example usage:
const minStack = new MinStack();
minStack.push(5);
minStack.push(3);
minStack.push(7);
minStack.push(3);

console.log(minStack.getMin()); // 3
minStack.pop();
console.log(minStack.getMin()); // 3
minStack.pop();
console.log(minStack.getMin()); // 3
minStack.pop();
console.log(minStack.getMin()); // 5

// --------------------------------------------------------------------

// another way - from chat gpt

class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val) {
        this.stack.push(val);
        // Push to minStack if it's empty or the current value is the new minimum
        if (this.minStack.length === 0 || val <= this.getMin()) {
            this.minStack.push(val);
        }
    }

    pop() {
        const poppedValue = this.stack.pop();
        // If the popped value is the minimum, pop it from the minStack as well
        if (poppedValue === this.getMin()) {
            this.minStack.pop();
        }
    }

    top() {
        // Return the top element of the main stack
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        // Return the top element of the min stack, which is the current minimum
        return this.minStack[this.minStack.length - 1];
    }
}

// Example usage:
const minStackk = new MinStack();
minStackk.push(5);
minStackk.push(3);
minStackk.push(7);
minStackk.push(3);

console.log(minStackk.getMin()); // 3
minStackk.pop();
console.log(minStackk.getMin()); // 3
minStackk.pop();
console.log(minStackk.getMin()); // 3
minStackk.pop();
console.log(minStackk.getMin()); // 5

// ---------------------------------------------------------

// from striver - TUF
// condition is that we have to store only one value in a stack

class MinStack {
    stack = [];        // Main stack to store all elements
    min = Infinity;    // Variable to track the minimum element in the stack

    // Pushes a value onto the stack
    push(val) {
        if (this.stack.length == 0) {  // If stack is empty, this is the first element
            this.min = val;            // Set the current element as the minimum
            this.stack.push(val);      // Push the element onto the stack
        } else {
            if (val > this.min) {      // If the current value is greater than the current minimum
                this.stack.push(val);  // Push the value directly onto the stack
            } else {
                // If the current value is smaller or equal to the current minimum
                // Push a calculated value to represent this element while preserving the previous minimum
                this.stack.push(2 * val - this.min);
                this.min = val;        // Update the minimum to the new value
            }
        }
    }

    // Pops the top element from the stack
    pop() {
        if (this.stack.length == 0) {  // If stack is empty, there's nothing to pop
            return;
        }
        let x = this.stack[this.stack.length - 1];  // Get the top element
        this.stack.pop();           // Remove the top element from the stack

        if (x < this.min) {         // If the popped element is less than the current minimum
            // Restore the previous minimum value using the stored difference
            this.min = 2 * this.min - x;
        }
    }

    // Returns the top element of the stack without removing it
    top() {
        if (this.stack.length == 0) return;  // If stack is empty, return undefined

        let x = this.stack[this.stack.length - 1];  // Get the top element

        if (this.min < x) return x;  // If the top element is greater than the current minimum, return it

        return this.min;  // If the top element is an encoded value, return the current minimum instead
    }

    // Returns the minimum element in the stack
    getMin() {
        return this.min;  // Return the current minimum value stored
    }

    // Utility method to display the current state of the stack (mainly for debugging)
    display() {
        return this.stack;  // Return the current stack array
    }
}

// Example usage of the MinStack class
let stackk = new MinStack();

stackk.push(12);       // Stack: [12], Min: 12
stackk.push(15);       // Stack: [12, 15], Min: 12
stackk.push(10);       // Stack: [12, 15, 8], Min: 10

console.log(stackk.getMin()); // 10, current minimum

stackk.pop();          // Stack: [12, 15], Min: 12 (after popping 10)

console.log(stackk.getMin()); // 12, new minimum after popping

console.log(stackk.top()); // 15, top element of the stack

stackk.push(10);       // Stack: [12, 15, 8], Min: 10

console.log(stackk.top()); // 10, new top element after pushing

