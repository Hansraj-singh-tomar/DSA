function findPeak(arr, start, end) {
    if (arr.length == 1) return arr[0];
    if (arr[start] > arr[start + 1]) return arr[start];
    if (arr[end] > arr[end - 1]) return arr[end];

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) {
            return arr[mid];
        } else if (arr[mid - 1] > arr[mid]) {
            end = mid - 1;
            // } else if (arr[mid] > arr[mid + 1]) { // this line was creating an problem 
        } else {
            start = mid + 1;
        }
    }
    return -1; // This line should never be reached
}

// let arr = [2, 4, 6, 8, 10, 8, 5, 2];  // 10
// let arr = [6, 7, 8, 9]; // 9
// let arr = [3]; // 3
let arr = [1, 6, 3, 2, 1]; // in that array we were getting an array
console.log(findPeak(arr, 0, arr.length - 1));

