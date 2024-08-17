// Brute force approach
// TC - O(n^2)
function twoSum(arr, target) {
    let ans = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                ans.push(i);
                ans.push(j);
            }
        }
    }
    return ans
}
let arr = [2, 7, 25, 16, 9];
let target = 18;
console.log(twoSum(arr, target)); // [0, 3]

// -----------------------------------------------------------------------------

// Better approach
// Tc - O(n)
function twoSum(arr, target) {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        let complement = target - arr[i];
        if (obj.hasOwnProperty(complement)) {
            // return [obj[complement], i]
            return [complement, arr[i]]
        }
        obj[arr[i]] = i;
    }

    return [];
}
let arr1 = [2, 7, 25, 16, 9];
let target1 = 18;
console.log(twoSum(arr1, target1)); // [2, 16]

// -------------------------------------------------------

// using two pointers approach
// time complexit is O(n) + O(nLogn)

function twoSum(arr, target, start, end) {
    arr = arr.sort((a, b) => a - b)

    while (start < end) {
        const sum = arr[start] + arr[end];
        if (sum == target) {
            return [arr[start], arr[end]]
        } else if (sum > target) {
            end--;
        } else {
            start++;
        }
    }

    return [];
}

let arr2 = [2, 7, 25, 16, 9];
let target2 = 18;
console.log(twoSum(arr2, target2, 0, arr.length - 1)); // [2, 16]