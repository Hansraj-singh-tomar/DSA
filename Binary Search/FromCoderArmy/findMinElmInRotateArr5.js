// search in a Rotated Array

function searchElm(arr, start, end) {
    let ans = arr[0];
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        if (arr[mid] >= arr[0]) {
            start = mid + 1;
        } else {
            ans = arr[mid];
            end = mid - 1;
        }
    }
    return ans
}

// let arr = [4, 6, 8, 10, 1, 2];
// let arr = [1, 4, 6, 8, 10, 2, 3];
// let arr = [2, 1];
// let arr = [1, 2, 3, 4, 5]; // iss array me mujhe ans = arr[0] initialize karna padega
console.log(searchElm(arr, 0, arr.length - 1)); // 1

