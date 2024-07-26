// Brute force - using sorting
// TC = O(nLogn)
// time complexity of array sort() method is O(nLogn)

function largestElm(arr) {
    let newArr = arr.sort((a, b) => a - b);
    return newArr[newArr.length - 1];
}

let arr = [1, 6, 4, 3, 2, 5];
console.log(largestElm(arr)); // 6

// ------------------------------------------------

// Optimal Approach
// Time complexity - O(n)

function largestElm(arr) {
    let largestElm = arr[0];

    for (let i = 1; i < arr.length - 1; i++) {
        if (arr[i] > largestElm) {
            largestElm = arr[i];
        }
    }

    return largestElm;
}

let arr2 = [1, 6, 4, 3, 2, 5];
console.log(largestElm(arr2)); // 6
