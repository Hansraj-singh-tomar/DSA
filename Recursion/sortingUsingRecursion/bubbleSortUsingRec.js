function bubbleSortUsingRec(arr, length) {

    // base case
    if (length == 1 || length == 0) {
        return arr;
    }

    // largest element ko end me rekhna hai 
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            let temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
    }

    // recursion call
    return bubbleSortUsingRec(arr, length - 1);
}

let arr = [24, 1, 43, 4];
console.log(bubbleSortUsingRec(arr, arr.length));