const items = [15, 20, 3, 9];
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivot = arr[arr.length - 1];
    // console.log(pivot); // 9
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    // we are using recursion here
    return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort(items));