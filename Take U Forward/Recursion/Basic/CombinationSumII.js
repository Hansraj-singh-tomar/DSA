function CombinationSumII(idx, target, ds) {
    if (target == 0) {
        console.log(ds);
        return;
    }

    for (let i = idx; i < arr.length; i++) {

        if (i > idx && arr[i] == arr[i - 1]) {
            // (arr[i] == arr[i - 1]) = if it is a repeated element then skip it
            // i > idx = if it is not the first element then skip it
            continue;
        }
        if (arr[i] > target) {
            break;
        }

        ds.push(arr[i]);
        CombinationSumII(i + 1, target - arr[i], ds);
        ds.pop(); // while comming back we have to remove that elm from the array
    }
}

let arr = [1, 1, 1, 2, 2];
let target = 4;
let ds = [];
// Note - firstly we have to sort the array
arr.sort((a, b) => a - b);
CombinationSumII(0, target, ds); // [ 1, 1, 2 ]  [ 2, 2 ]