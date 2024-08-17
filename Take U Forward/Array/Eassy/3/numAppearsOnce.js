// Find the number that appears once and other numbers twice.

// Brute force approach
// TC - O(n^2)

function numAppearOnce(arr) {
    for (let i = 0; i < arr.length; i++) {
        let num = arr[i];
        let count = 0;
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] == num) {
                count++;
            }
        }
        if (count == 1) {
            return num;
        }
    }
}

let arr = [1, 1, 2, 3, 3, 4, 4];
console.log(numAppearOnce(arr)); // 2

// --------------------------------------------------------------

// Better approach using hash map
// TC - O(n1 + n2)
function numbersAppearOnce(arr) {
    let hash = {};

    for (let elm of arr) {
        if (!hash[elm]) {
            hash[elm] = 1;
        } else {
            hash[elm]++;
        }
    }

    for (let elm in hash) {
        if (hash[elm] == 1) {
            return elm;
        }
    }
}

let arr1 = [1, 1, 2, 3, 3, 4, 4];
console.log(numbersAppearOnce(arr1)); // 2

// -----------------------------------------------------------

// optimal approach

function numbersAppearOnce(arr) {
    let xor = 0;
    for (let i = 0; i < arr.length; i++) {
        xor = xor ^ arr[i]
    }
    return xor;
}

let arr2 = [1, 1, 2, 3, 3, 4, 4];
console.log(numbersAppearOnce(arr2)); // 2 



