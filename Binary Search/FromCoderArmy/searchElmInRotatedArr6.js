function searchElm(arr, start, end, target) {
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] >= arr[0]) { // left side me sorted hai
            if (arr[start] <= target && arr[mid] > target) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        } else { // right side me sorted hai
            if (arr[mid] < target && arr[end] > target) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }
    return -1;
}

let arr = [4, 6, 8, 10, 1, 2]; // 4
// let arr = [2, 1]; // 1
// let arr = [1, 2, 3, 4, 5]; // 0
console.log(searchElm(arr, 0, arr.length - 1, 1));

