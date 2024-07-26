// time complexity - O(N)

let arr = [2, 7, 11, 15, 27];
let target = 22;
let start = 0;
let end = arr.length - 1;

while (start < end) {
    if (arr[start] + arr[end] == target) {
        console.log([arr[start], arr[end]])
        break;
    } else if (target > arr[start] + arr[end]) {
        start++
    } else {
        end--;
    }
}
