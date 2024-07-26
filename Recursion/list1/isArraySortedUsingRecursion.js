function isArrSorted(arr, length) {
    // base case 
    if (length == 0 || length == 1) {
        return true
    }

    if (arr[0] > arr[1]) {
        return false
    } else {
        let ans = isArrSorted(arr.splice(1), length - 1)
        return ans;
    }
}

let arr = [1, 2, 3, 4, 5, 6];
let length = arr.length;
console.log(isArrSorted(arr, length)); // true
