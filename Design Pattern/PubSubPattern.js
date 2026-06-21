class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(event, fn) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(fn);
  }

  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(fn => fn(data));
    }
  }
}

// Usage
const bus = new EventBus();

bus.subscribe("userLoggedIn", (data) => {
  console.log("Subscriber1:", data);
});

bus.subscribe("userLoggedIn", (data) => {
  console.log("Subscriber2:", data);
});

bus.publish("userLoggedIn", { name: "Hansraj" });