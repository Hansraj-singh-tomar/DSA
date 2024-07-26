// Count SubArr Where Max Element Appear at least K Times
// arr = [1, 2, 3, 2, 3, 1, 2, 3, 3, 2];
// maxElm = 3; // aur ye maxElm kisi bhi sub array me atleast k = 2 time or more than that aana chahiye
// [1,2,3,2,3], [2,3,2,3], [3,2,3] .... so on

function CountSubArrMaxElmAppearAtLeastKTime(arr, k) {
    let n = arr.length;

    let maxElm = Math.max(...arr);
    // console.log(maxElm); // 3

    let start = 0;
    let end = 0;
    let count = 0;
    let totalSubArr = 0;

    while (end < n) {
        if (arr[end] === maxElm) {
            count++;
        }

        while (count == k) {
            totalSubArr += n - end;
            if (arr[start] == maxElm) {
                count--;
            }
            start++;
        }

        end++;
    }

    return totalSubArr;
}

let arr = [1, 2, 3, 2, 3, 1, 2, 3, 3, 2];
let k = 2;
console.log(CountSubArrMaxElmAppearAtLeastKTime(arr, k)); // 30