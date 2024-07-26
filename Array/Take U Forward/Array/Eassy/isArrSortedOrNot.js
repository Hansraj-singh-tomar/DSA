function isArrSortedOrNot(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] >= arr[i - 1]) {

        } else {
            return false
        }
    }
    return true
}

let arr = [1, 2, 2, 3, 4, 5];
console.log(isArrSortedOrNot(arr)); // true

