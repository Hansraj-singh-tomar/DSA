// Time complexity - O(n)
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

let arr = [4, 3, 2, 1, 2, 7, 6];
console.log(missingRepeating(arr, arr.length)); // {missing: 1, repeating: 2}

