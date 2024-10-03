class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, list) {
        const node = { element, list };
        let added = false;

        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].element > node.element) {
                this.queue.splice(i, 0, node);
                added = true;
                break;
            }
        }

        if (added === false) {
            this.queue.push(node);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

function mergeKLists(Lists) {
    const pq = new PriorityQueue();

    for (let i = 0; i < Lists.length; i++) {
        pq.enqueue(Lists[i].data, Lists[i]);
    }

    let dummyNode = new Node(-1);
    let temp = dummyNode;

    while (pq.isEmpty() == false) {
        let node = pq.dequeue();
        temp.next = node.list;
        temp = temp.next;
        if (node.list.next !== null) {
            pq.enqueue(node.list.next.data, node.list.next);
        }
    }

    return dummyNode.next;
}

// Example Usage:

// Creating k sorted linked lists
let list1 = new Node(1, new Node(4, new Node(5)));
let list2 = new Node(1, new Node(3, new Node(4)));
let list3 = new Node(2, new Node(6));

// Array of k sorted linked lists
let lists = [list1, list2, list3];

// Merge k sorted linked lists
let mergedList = mergeKLists(lists);

console.log(mergedList); // 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6 // {data: 1, next: {data: 1, next: {data: 2, next: {data: 3, next: {data: 4, next: {data: 4, next: {data: 5, next: {data: 6, next: null}}}}}}}}


// -------------------------------------------------------------------------------------------------------------------------------------


// Leetcode solution
// This uses MinPriorityQueue class from the datastructures-js library that is available in the LeetCode runtime. 
// I would argue that since these datastructures are available in other languages I would not expect to have to write my own implementation in an interview 
// and it should be sufficient to "stub" a class as long as I can explain the underlying data structure

const mergeKLists = function (lists) {
    const queue = new MinPriorityQueue({ priority: x => x.val })

    for (const head of lists) {
        if (head) {
            queue.enqueue(head)
        }
    }

    let result = new ListNode()
    const head = result

    while (!queue.isEmpty()) {
        const { val, next } = queue.dequeue().element

        result.next = new ListNode(val)
        result = result.next

        if (next) {
            queue.enqueue(next)
        }
    }

    return head.next
}