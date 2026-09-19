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

  // unsubscribe add karna helpful hota hai
unsubscribe(event, fn) {
  if (this.events[event]) {
    this.events[event] = this.events[event].filter(f => f !== fn);
  }
}

// ek baar listen karne ke liye
once(event, fn) {
  const wrapper = (data) => {
    fn(data);
    this.unsubscribe(event, wrapper);
  };
  this.subscribe(event, wrapper);
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