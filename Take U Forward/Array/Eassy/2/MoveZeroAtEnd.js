// Move all zero to the end of the array

// Brute force
// TC - O(n) + O(x) + O(n-x) = O(2n)

function moveZeroToEnd(arr) {
    let temp = [];

    // push non-zero value inside the temp array
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            temp.push(arr[i]);
        }
    }

    // push back non zero value to that array
    for (let i = 0; i < temp.length; i++) {
        arr[i] = temp[i];
    }

    // push zero to remaining place
    for (let i = temp.length; i < arr.length; i++) {
        arr[i] = 0;
    }

    return arr;
}

let arr = [1, 0, 2, 3, 2, 0, 0, 4, 5, 1];
console.log(moveZeroToEnd(arr)); //  [1, 2, 3, 2, 4, 5, 1, 0, 0, 0]

// --------------------------------------------------------------------------

// optimal approach - two pointers
// TC - O(x) + O(n-x) = O(n)

function moveZeroToEnd(arr) {
    let j = -1;

    // As we get zero we store that index into j and break the loop
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 0) {
            j = i;
            break;
        }
    }

    // no non zero numbers
    if (j == -1) return 0;

    // as we get zero we start this loop
    for (let i = j + 1; i < arr.length; i++) {
        if (arr[i] !== 0) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            j++;
        }
    }

    return arr;
}

let arr2 = [1, 0, 2, 3, 2, 0, 0, 4, 5, 1];
console.log(moveZeroToEnd(arr2)); // [1, 2, 3, 2, 4, 5, 1, 0, 0, 0]

// -------------------------------------------------------------------------------

// Another optimal approach
function moveZero(arr) {
    let i = 0; let j = 0;

    while (i < arr.length) {
        if (arr[i] !== 0) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            j++;
        }
        i++;
    }
    return arr;
}

let arr3 = [1, 0, 2, 3, 0, 0, 4, 5];
console.log(moveZero(arr3)); // [1,2,3,4,5,0,0,0]
