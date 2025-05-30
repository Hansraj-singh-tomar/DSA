function comSum(idx, target, ans, res) {
    if (target == 0) {
        res.push([...ans]);
        return;
    }

    if (idx >= arr.length || target < 0) return;

    ans.push(arr[idx]);
    comSum(idx, target - arr[idx], ans, res);
    ans.pop();
    comSum(idx + 1, target, ans, res);
}

let arr = [2, 3, 6, 7];
let target = 7;
let ans = [];
let res = [];
comSum(0, target, ans, res);

console.log(res); // [ [ 2, 2, 3 ], [ 7 ] ]
