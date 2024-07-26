function merge(leftArr, rightArr) {
    let mergeArr = [];
    let leftIdx = 0;
    let rightIdx = 0;

    while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
        if (leftArr[leftIdx] > rightArr[rightIdx]) {
            mergeArr.push(rightArr[rightIdx]);
            rightIdx++;
        } else {
            mergeArr.push(leftArr[leftIdx]);
            leftIdx++;
        }
    }

    return [...mergeArr, ...leftArr.slice(leftIdx), ...rightArr.slice(rightIdx)];
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let mid = Math.floor(arr.length / 2)
    let leftArr = arr.slice(0, mid);
    let rightArr = arr.slice(mid);

    return merge(mergeSort(leftArr), mergeSort(rightArr))
}

let items = [13, 3, 5, 2, 9, 11];
console.log(mergeSort(items));

