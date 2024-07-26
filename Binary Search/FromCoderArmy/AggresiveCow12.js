// from coder army

// logic - min[max]

function aggresiveCow(arr, totalCow) {
    let start = 0;
    let end = arr[arr.length - 1] - arr[0];
    let ans;
    while (start <= end) {
        let mid = Math.floor(start + (end - start) / 2);
        let pos = arr[0];
        let cowCount = 1;

        for (let i = 1; i < arr.length; i++) {
            if (pos + mid <= arr[i]) {
                cowCount++;
                pos = arr[i];
            }
        }

        if (cowCount < totalCow) {
            end = mid - 1;
        } else {
            ans = mid;
            start = mid + 1;
        }
    }

    return ans;
}

let arr = [10, 2, 5, 7, 1];
let sortedArr = arr.sort((a, b) => a - b);
let totalCow = 2
console.log(aggresiveCow(sortedArr, totalCow)); // 9


// what next, what to do and all that
// i must solve the tree priblem which will be good for me
// array, string, binary search, recursion, DP, sorting, 