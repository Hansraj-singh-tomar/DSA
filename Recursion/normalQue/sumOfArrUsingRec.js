function sumOfArrUsingRec(arr, length) {
    // base case 
    if (length == 0) {
        return 0;
    }
    return arr[0] + sumOfArrUsingRec(arr.splice(1), length - 1);
}

let arr = [1, 2, 3, 5, 1, 6];
let length = arr.length;
console.log(sumOfArrUsingRec(arr, length)); // 18

// -----------------------------------------------------------


// second way to do it

function recursiveSum(arr, index = 0) {
    // Base case: if the index is equal to the length of the array, return 0
    if (index === arr.length) {
        return 0;
    }

    // Recursive case: return the current element plus the sum of the remaining elements
    return arr[index] + recursiveSum(arr, index + 1);
}

// Example usage:
const array = [1, 2, 3, 4, 5];
const sum = recursiveSum(array);
console.log(sum); // 15
