// using recursion

function permutation(arr, index, ans) {
    if (index >= arr.length) {
        ans.push([...arr])
        return;
    }

    for (let j = index; j < arr.length; j++) {
        [arr[j], arr[index]] = [arr[index], arr[j]]
        permutation(arr, index + 1, ans);

        // backtrack
        // ye swap array ko again ussi form me lane ke liye jo swap se pehle tha
        [arr[j], arr[index]] = [arr[index], arr[j]]
    }
}

let arr = [1, 2, 3];
let ans = [];
permutation(arr, 0, ans);
console.log(ans); // [ [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 2, 1], [3, 1, 2]]