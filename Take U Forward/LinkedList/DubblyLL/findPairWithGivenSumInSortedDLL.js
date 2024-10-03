// Approach - 1

class Node {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

function findPairWithGivenSum(head, sum) {
    let temp1 = head;
    let ans = [];

    while (temp1 !== null) {
        let temp2 = temp1;
        while (temp2 !== null && temp1.data + temp2.data <= sum) {
            if (temp1.data + temp2.data === sum) {
                ans.push([temp1.data, temp2.data]);
            }
            temp2 = temp2.next;
        }
        temp1 = temp1.next;
    }

    return ans;
}

// Manually creating a doubly linked list
let head = new Node(1);
let second = new Node(2);
let third = new Node(3);
let fourth = new Node(4);
let fifth = new Node(9);

// Linking the nodes together (doubly linked list)
head.next = second;

second.prev = head;
second.next = third;

third.prev = second;
third.next = fourth;

fourth.prev = third;
fourth.next = fifth;

fifth.prev = fourth;



console.log(findPairWithGivenSum(head, 5)); // [[1, 4], [2, 3]]


// ---------------------------------------------------------------------------------------

// Approach - 2 => Two pointers

class Node {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

function findTail(head) {
    let curr = head;

    while (curr.next !== null) {
        curr = curr.next;
    }

    return curr;
}

function findPairWithGivenSum(head, sum) {
    let left = head;
    let right = findTail(head);
    let ans = [];

    while (left.data < right.data) {
        if (left.data + right.data === sum) {
            ans.push([left.data, right.data]);
            left = left.next;
            right = right.prev;
        } else if (left.data + right.data < sum) {
            left = left.next;
        } else if (left.data + right.data > sum) {
            right = right.prev;
        }
    }

    return ans;
}

// Manually creating a doubly linked list
let head = new Node(1);
let second = new Node(2);
let third = new Node(3);
let fourth = new Node(4);
let fifth = new Node(9);

// Linking the nodes together (doubly linked list)
head.next = second;

second.prev = head;
second.next = third;

third.prev = second;
third.next = fourth;

fourth.prev = third;
fourth.next = fifth;

fifth.prev = fourth;

console.log(findPairWithGivenSum(head, 5)); // [[1, 4], [2, 3]]





