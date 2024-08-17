// Leader in an array - Everything in the right side should be smaller

// Brute force approach
// TC - O(n^2)
// SC - O(n)

function leaderInArray(arr) {
    let ans = [];
    for (let i = 0; i < arr.length; i++) {
        let flag = true;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] > arr[i]) {
                flag = false;
            }
        }

        if (flag == true) ans.push(arr[i]);
    }

    return ans;
}

let arr = [10, 22, 12, 3, 0, 6];
console.log(leaderInArray(arr)); // [22, 12, 6]

// -------------------------------------------------------

// Optimal approach
// TC - O(n)
// SC - O(n)

function leaderInArray(arr) {
    let n = arr.length;
    let ans = [];
    let maxLeader = -Infinity;

    for (let i = n - 1; i >= 0; i--) {
        if (arr[i] > maxLeader) {
            ans.push(arr[i])
            maxLeader = Math.max(maxLeader, arr[i])
        }
    }

    return ans;
}

let arr1 = [10, 22, 12, 3, 0, 6];
console.log(leaderInArray(arr1)); // [6, 12, 22]