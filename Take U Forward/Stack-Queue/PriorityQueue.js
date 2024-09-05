class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    // Method to add an element with a given priority
    enqueue(element, priority) {
        const node = { element, priority };
        let added = false;

        // Insert the node at the correct position based on priority
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].priority > node.priority) {
                this.queue.splice(i, 0, node);
                added = true;
                break;
            }
        }

        // If the element has the lowest priority, add it at the end
        if (!added) {
            this.queue.push(node);
        }
    }

    // Method to remove and return the element with the highest priority
    dequeue() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.queue.shift().element;
    }

    // Method to check if the queue is empty
    isEmpty() {
        return this.queue.length === 0;
    }

    // Method to view the element with the highest priority without removing it
    front() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.queue[0].element;
    }

    // Method to view the element with the lowest priority without removing it
    rear() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.queue[this.queue.length - 1].element;
    }

    // Method to get the size of the queue
    size() {
        return this.queue.length;
    }
}

// Example usage:
const pq = new PriorityQueue();

pq.enqueue("A", 2);
pq.enqueue("B", 1);
pq.enqueue("C", 3);

console.log(pq.dequeue()); // Output: B (since it has the highest priority, i.e., the lowest number)
console.log(pq.front());   // Output: A
console.log(pq.rear());    // Output: C
console.log(pq.size());    // Output: 2
