function miniSizeSubArrSum(arr, target) {
    let start = 0;
    let end = 0;
    let sum = 0;
    let minLength = Infinity;

    while (end < arr.length) {
        sum += arr[end];

        // can i decrease the length of window
        while (sum >= target) {
            minLength = Math.min(minLength, end - start + 1);
            sum -= arr[start];
            start++;
        }

        end++;
    }

    return minLength == Infinity ? 0 : minLength;
}

let arr = [2, 3, 1, 2, 4, 3];
const target = 7;
console.log(miniSizeSubArrSum(arr, target)); // 2 // [4, 3] => [1,2,4], [4, 3]