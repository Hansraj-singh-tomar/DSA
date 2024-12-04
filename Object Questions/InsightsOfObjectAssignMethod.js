// 1.

let node = {
    id: 1,
    name: "hansraj",
    age: 23
}

let updatedData = {
    id: 1,
    name: "elon",
    age: 24
}

let updatedResult = Object.assign(node, updatedData);
console.log(updatedResult); // { id: 1, name: 'elon', age: 24 }

// --------------------------------------------------------------------------------

// 2. Shallow copy
let obj = {
    name: "hansraj"
}

let obj2 = Object.assign({}, obj)
console.log(obj2); // {name: "hansraj"}
console.log(obj == obj2) // false

// --------------------------------------------------------------------------------

// 3.
const person = {
    name: "Alice"
};

const mixin = {
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

// Add mixin's methods to person
Object.assign(person, mixin);

person.greet(); // "Hello, my name is Alice"

// --------------------------------------------------------------------------------

// 4. Inside prototype
class Dog {
    constructor(name) {
        this.name = name;
    }
}
const dogFunctionality = {
    bark: () => console.log("Woof!"),
    wagTail: () => console.log("Wagging my tail!"),
    play: () => console.log("Playing!"),
};

Object.assign(Dog.prototype, dogFunctionality);
let dog = new Dog("Daisy");
console.log(dog); // {name: "Daisy", [[Prototype]]}: {bark: () =>...}

// --------------------------------------------------------------------------------

// Using Object.assign() for Multiple Mixins
const CanSwim = {
    swim() {
        console.log(`${this.name} is swimming.`);
    }
};

const CanJump = {
    jump() {
        console.log(`${this.name} is jumping.`);
    }
};

const fish = { name: "Goldfish" };
Object.assign(fish, CanSwim, CanJump);

fish.swim(); // "Goldfish is swimming."
fish.jump(); // "Goldfish is jumping."

// ---------------------------------------------------
class Dog {
    constructor(name) {
        this.name = name;
    }
}

const animalFunctionality = {
    walk: () => console.log("Walking!"),
    sleep: () => console.log("Sleeping!"),
};

const dogFunctionality2 = {
    bark: () => console.log("Woof!"),
    wagTail: () => console.log("Wagging my tail!"),
    play: () => console.log("Playing!"),
    walk() {
        super.walk();
    },
    sleep() {
        super.sleep();
    },
};

Object.assign(dogFunctionality2, animalFunctionality);
Object.assign(Dog.prototype, dogFunctionality2);