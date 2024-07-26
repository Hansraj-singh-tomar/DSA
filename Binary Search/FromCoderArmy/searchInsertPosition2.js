// search insert position
function abc(arr, target) {
    let start = 0;
    let end = arr.length - 1;
    let ans = arr.length;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] == target) {
            // ans = mid;
            // break;

            return mid
        } else if (arr[mid] < target) {
            start = mid + 1;
        } else { // arr[mid] > target
            ans = mid;
            end = mid - 1;
        }
    }

    return ans;
}

let arr = [1, 4, 6, 8, 10, 14, 16, 18];
let target = 5;
console.log(abc(arr, target)); // 2 // agar 5 exist karta to vo second position par hota