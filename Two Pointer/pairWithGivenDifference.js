let arr = [5, 10, 3, 2, 50, 80];
let difference = 45;
arr.sort((a, b) => a - b);

let start = 0;
let end = 1;

let ans = [];

while (start < end) {
    if (arr[end] - arr[start] == difference) {
        ans.push(arr[start]);
        ans.push(arr[end]);
        break;
    } else if (arr[end] - arr[start] > difference) {
        start++;
    } else {
        end++;
    }
}

console.log(ans); // [5, 50]
