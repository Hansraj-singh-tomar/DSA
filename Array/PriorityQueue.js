class PriorityQueue {
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.compare = comparator;
  }

  // ---------- Basic helpers ----------
  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    return this.heap[0];
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  left(i) {
    return 2 * i + 1;
  }

  right(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // ---------- Core operations ----------
  enqueue(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  dequeue() {
    if (this.isEmpty()) return null;
    if (this.size() === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return top;
  }

  // ---------- Heapify Up ----------
  heapifyUp() {
    let i = this.size() - 1;

    while (i > 0) {
      const p = this.parent(i);

      // if parent is already in correct order, stop
      if (this.compare(this.heap[p], this.heap[i]) <= 0) break;

      this.swap(i, p);
      i = p;
    }
  }

  // ---------- Heapify Down ----------
  heapifyDown() {
    let i = 0;

    while (this.left(i) < this.size()) {
      let best = this.left(i);
      const right = this.right(i);

      if (
        right < this.size() &&
        this.compare(this.heap[right], this.heap[best]) < 0
      ) {
        best = right;
      }

      if (this.compare(this.heap[i], this.heap[best]) <= 0) break;

      this.swap(i, best);
      i = best;
    }
  }

  // ---------- Utility ----------
  toArray() {
    return [...this.heap];
  }
}

const taskPQ = new PriorityQueue(
  (a, b) => a.priority - b.priority
);

taskPQ.enqueue({ task: "Email", priority: 3 });
taskPQ.enqueue({ task: "Fix Bug", priority: 1 });
taskPQ.enqueue({ task: "Meeting", priority: 2 });

console.log(taskPQ.toArray())

console.log(taskPQ.dequeue());
// { task: "Fix Bug", priority: 1 }