class Node {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}


class Browser {
    constructor(homePage) {
        this.head = new Node(homePage);
        this.current = this.head;
    }

    visit(url) {
        let newNode = new Node(url);
        newNode.prev = this.current;
        this.current.next = newNode;
        this.current = newNode;
    }

    back(steps) {
        while (steps) {
            if (this.current.prev) {
                this.current = this.current.prev;
            } else {
                break;
            }
            steps--;
        }

        return this.current.data;
    }

    forward(steps) {
        while (steps) {
            if (this.current.next) {
                this.current = this.current.next;
            } else {
                break;
            }
            steps--;
        }

        return this.current.data;
    }
}

let browser = new Browser("takeuforward.org");
browser.visit("google.com");
browser.visit("instagram.com");
browser.visit("facebook.com");
// console.log(browser);

console.log(browser.back(1)); // instagram.com
console.log(browser.back(1)); // google.com
console.log(browser.forward(1)); // instagram.com

browser.visit("takeuforward.com"); // takeuforward.com

console.log(browser.forward(2)); // takeuforward.com
console.log(browser.back(2)); // google.com
console.log(browser.back(7)); // takeuforward.org
console.log(browser.current.data); // takeuforward.com