// right rotate (k = 2)=> [1,2,3,4,5] =  [4,5,1,2,3];
// left rotate (k = 2) => [1,2,3,4,5] = [3,4,5,1,2];


// example of left rotate
function rightRotateByOne(arr, n) {
    let temp = arr[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        arr[i + 1] = arr[i];
    }
    arr[0] = temp;
    return arr;
}

let arr = [1, 2, 3, 4, 5]; // [5,1,2,3,4];

console.log(rightRotateByOne(arr, arr.length)); // [5, 1, 2, 3, 4]

// left rotate
function leftRotated(arr) {
    let temp = arr[0];
    for (let i = 1; i < arr.length; i++) {
        arr[i - 1] = arr[i];
    }
    arr[arr.length - 1] = temp;
    return arr;
}

let arr2 = [1, 2, 3, 4, 5];
console.log(leftRotated(arr2)); // [2,3,4,5,1];