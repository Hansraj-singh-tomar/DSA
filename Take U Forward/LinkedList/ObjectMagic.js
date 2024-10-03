class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

let dummyNode = new Node(-1);
let result = dummyNode;

let list1 = new Node(4, new Node(9)); // 4 -> 9
let list2 = new Node(5, new Node(6, new Node(8))); // 5 -> 6 -> 8

// ----------------------
result.next = list1;
result = list1;

console.log(dummyNode); // -1 -> 4 -> 9 // -1 -> 4 -> 5 -> 6 -> 8 // {data: -1, next: {data: 4, next: { data: 9, next: null } } }, changed to => { data: -1, next: { data: 4, next: {  data: 5, next: { data: 6, next: { data: 8, next: null } } } } } }
console.log(result); // 4 -> 9 // 4 -> 5 -> 6 -> 8 // { data: 4, next: { data: 9, next: null } }, changed to => {data: 4, next: {  data: 5, next: { data: 6, next: { data: 8, next: null } } }}

// ------------------------
result.next = list2;

console.log(result); // 4 -> 5 -> 6 -> 8 // { data: 4, next: {  data: 5, next: { data: 6, next: { data: 8, next: null } } } }

result = list2;

console.log(dummyNode); // -1 -> 4 -> 5 -> 6 -> 8 // { data: -1, next: { data: 4, next: {  data: 5, next: { data: 6, next: { data: 8, next: null } } } } } }
console.log(result); // 5 -> 6 -> 8  // { data: 5, next: { data: 6, next: { data: 8, next: null } } }



