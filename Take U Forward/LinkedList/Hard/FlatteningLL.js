// Apprach - 1
// Brute Force Approach - Creating Array
// TC - O(n*m) * 2 + xLogx(sorting)
// SC - O(n*m) * 2 // first storing elm into an array // second for creating new LL in order to store all the elm
class Node {
    constructor(data, next = null, child = null) {
        this.data = data;
        this.next = next;
        this.child = child;
    }
}

// Note - We have to create vertical linked list not horizontal
// for vertical LL we will use child and for horizontal LL we will use next
function convertArrToLL(arr) {
    if (arr.length == 0) return null;
    let head = new Node(arr[0]);
    let temp = head;

    for (let i = 1; i < arr.length; i++) {
        temp.child = new Node(arr[i]);
        temp = temp.child;
    }

    return head;
}


function flatteningLL(head) {
    let arr = [];
    let temp = head;

    // step - 1
    while (temp != null) {
        let t2 = temp;
        while (t2 != null) {
            arr.push(t2.data);
            t2 = t2.child;
        }
        temp = temp.next;
    }

    // step - 2
    arr.sort((a, b) => a - b);

    // step - 3
    return convertArrToLL(arr);
}

let head = new Node(3);

head.next = new Node(2);
head.next.child = new Node(10);

head.next.next = new Node(1);
head.next.next.child = new Node(7);
head.next.next.child.child = new Node(11);
head.next.next.child.child.child = new Node(12);

head.next.next.next = new Node(4);
head.next.next.next.child = new Node(9);

head.next.next.next.next = new Node(5);
head.next.next.next.next.child = new Node(6);
head.next.next.next.next.child.child = new Node(8);
// console.log(head); // 3->(2->10)->(1->7->11->12)->(4->9)->(5->6->8)

console.log(flatteningLL(head)); // {data: 1, next: null, child: {data: 2, next: null, child: {data: 3, next: null, child: {.....}}} }


// --------------------------------------------------------------------------------

// Optimala Approach
// 1. vertical items are already stored
// 2. instead of creating new LL we can use the same LL
// 3. firstly we merge two vertical LL then so on, using recursion

class Node {
    constructor(data, next = null, child = null) {
        this.data = data;
        this.next = next;
        this.child = child;
    }
}

function mergeLists(list1, list2) {
    if (list1 == null) return list2;
    if (list2 == null) return list1;
    let dummyNode = new Node(-1);
    let result = dummyNode; // yha mene dummyNode obj ka refrence pass kiya hai

    while (list1 != null && list2 != null) {
        if (list1.data < list2.data) {
            result.child = list1;
            result = list1; // yha ham newObj(list1) ko assign kar rhe hai, ab isme changes karunga to dummyNode me changes nhi dekhne ko milenge
            list1 = list1.child;
        } else {
            result.child = list2;
            result = list2;
            list2 = list2.child;
        }
        result.next = null;
    }

    if (list1) result.child = list1;
    if (list2) result.child = list2;
    return dummyNode.child;
}

function flatten(head) {
    if (head == null || head.next == null) return head;

    let mergedHead = flatten(head.next);

    return mergeLists(head, mergedHead);
}

let head = new Node(3);

head.next = new Node(2);
head.next.child = new Node(10);

head.next.next = new Node(1);
head.next.next.child = new Node(7);
head.next.next.child.child = new Node(11);
head.next.next.child.child.child = new Node(12);

head.next.next.next = new Node(4);
head.next.next.next.child = new Node(9);

head.next.next.next.next = new Node(5);
head.next.next.next.next.child = new Node(6);
head.next.next.next.next.child.child = new Node(8);

console.log(flatten(head)); // {data: 1, next: null, child: {data: 2, next: null, child: {data: 3, next: null, child: {.....}}} }


// -------------------------------------------------------------------------------------------




// let head = new Node(5);
// head.child = new Node(14);
// head.next = new Node(10);
// head.next.child = new Node(4);
// head.next.next = new Node(12);
// head.next.next.child = new Node(20);
// head.next.next.child.child = new Node(13);
// head.next.next.next = new Node(7);
// head.next.next.next.child = new Node(17);

// console.log(head); // (5->14)->(10->4)->(12->20->13)->(7->17)
