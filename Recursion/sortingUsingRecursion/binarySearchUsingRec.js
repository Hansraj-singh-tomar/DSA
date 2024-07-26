function binarySearchUsingRec(arr, start, end, elm) {

    if (start > end) {
        return false
    }

    let mid = start + (end - start) / 2;

    if (arr[mid] == elm) {
        return true;
    }

    if (arr[mid] < elm) {
        return binarySearchUsingRec(arr, mid + 1, end, elm)
    } else {
        return binarySearchUsingRec(arr, start, mid - 1, elm)
    }
}


let arr = [2, 4, 5, 8, 10, 14, 19];
let mid = Math.floor(arr.length / 2);
console.log(binarySearchUsingRec(arr, 0, arr.length - 1, 14)); // true