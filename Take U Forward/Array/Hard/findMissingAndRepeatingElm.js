// find missing and repeating number from the given array

// Brute force approach
// TC - O(n^2)
// SC - O(1)
function findMissingAndRepeating(arr, n) {
    let repeatingElm = -1;
    let missingElm = -1;
    for (let i = 1; i < n; i++) {
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (i == arr[j]) {
                count++;
            }
        }

        if (count == 0) {
            missingElm = i;
        } else if (count > 1) {
            repeatingElm = i;
        }
        if (missingElm !== -1 && repeatingElm !== -1) {
            break;
        }
    }
    return { missingElm, repeatingElm }
}

let arr = [4, 3, 6, 2, 1, 1];
let n = arr.length;
console.log(findMissingAndRepeating(arr, n)); // {missing: 5, repeating: 1}

// -----------------------------------------------------------------------------------------

// Time complexity - O(2n)
// space complexity - O(n)

function missingRepeating(arr, n) {
    let obj = {};
    let missing;
    let repeating;
    for (let elm of arr) {
        if (!obj[elm]) {
            obj[elm] = 1;
        } else {
            obj[elm]++;
            if (obj[elm] == 2) {
                repeating = elm;
            }
        }
    }

    for (let i = 1; i <= arr.length; i++) {
        if (!arr[i]) {
            missing = i;
            break;
        }
    }

    return { missing, repeating }
}

let arr1 = [4, 3, 2, 1, 2, 7, 6];
console.log(missingRepeating(arr1, arr1.length)); // {missing: 1, repeating: 2}

