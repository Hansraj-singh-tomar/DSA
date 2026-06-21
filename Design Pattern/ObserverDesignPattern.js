class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(o => o !== fn);
  }

  notify(data) {
    this.observers.forEach(fn => fn(data));
  }
}

// Usage
const subject = new Subject();

const observer1 = (data) => console.log("Observer1:", data);
const observer2 = (data) => console.log("Observer2:", data);

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify("Hello");