class Node {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}


class Browser {
    Browser(homePage) {
        this.current = new Node(homePage);
    }

    visit(url) {
        let newNode = new Node(url);

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
browser.back(1);
browser.back(1);
browser.forward(1);
browser.visit("takeuforward.com");
browser.forward(2);
browser.back(2);
browser.back(7);
console.log(browser.current.data);