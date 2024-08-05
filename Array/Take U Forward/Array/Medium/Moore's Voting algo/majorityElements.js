// majority element (>N/2 times)
// count of repeating elements which is greater than to N/2

// Brute force approach
// TC - O(n^2) 
function majorityElement(arr) {
    let n = arr.length;
    for (let i = 0; i < arr.length; i++) {
        let count = 0;
        for (let j = 0; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                count++;
            }
        }
        if (count > n / 2) {
            return arr[i];
        }
    }
}

let arr = [2, 2, 3, 3, 1, 2, 2];
console.log(majorityElement(arr)); // 2

// -----------------------------------------------------------

// Better approach - using hash
// TC - O(n1 + n2)
// SC - O(n), bcz we are creating an object

function majorityElement(arr) {
    let hash = {};

    let n = arr.length;

    for (let elm of arr) {
        if (hash[elm]) {
            hash[elm]++;
        } else {
            hash[elm] = 1;
        }
    }

    for (let elm in hash) {
        if (hash[elm] > n / 2) {
            return elm;
        }
    }
}

let arr1 = [2, 2, 3, 3, 1, 2, 2];
console.log(majorityElement(arr1)); // 2

// -----------------------------------------------------------------

// Using - Moore's Voting Algorithm
// Optimal approach
// TC - O(n1 + n2)
// SC = O(1)

function majorityElement(arr) {
    let n = arr.length;
    let elm;
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (count == 0) {
            count = 1;
            elm = arr[i];
        } else if (elm == arr[i]) {
            count++;
        } else {
            count--;
        }
    }

    let count2 = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == elm) {
            count2++;
        }
    }

    if (count2 > n / 2) {
        return elm;
    }

    return -1;
}

// let arr2 = [2, 2, 1, 3, 1, 1, 3, 1, 1];
// let arr2 = [7, 7, 5, 7, 5, 1, 5, 7, 5, 5, 7, 7, 1, 1, 1, 1];
let arr2 = [7, 7, 5, 7, 5, 1, 5, 7, 5, 5, 7, 7, 5, 5, 5, 5];
console.log(majorityElement(arr2)); // 5
