// union of two sorted arrays

// Brute force using set method
// concatenation - O(n + m)
// creating set - O(n + m)
// TC - O(n + m) + O(n + m) = O(2(n + m))

// let arr1 = [1, 1, 2, 3, 4, 5];
// let arr2 = [2, 3, 4, 4, 5, 6];
// let union = new Set([...arr1, ...arr2]);
// console.log(union); // Set(6) {1,2,3,4,5,6}

// ---------------------------------------------------------------------------

// optimal approach
// TC - O(n1 + n2)
// SC - O(n1 + n2)

function unionOfSortedArr(arr1, arr2) {
    let union = [];
    let i = 0;
    let j = 0;
    let k = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            if (arr1[i] !== union[k - 1]) {
                union.push(arr1[i]);
                k++;
            }
            i++;
        } else {
            if (arr2[j] !== union[k - 1]) {
                union.push(arr2[j])
                k++;
            }
            j++;
        }
    }

    while (i < arr1.length) {
        if (arr1[i] !== union[k - 1]) {
            union.push(arr1[i])
            k++;
        }
        i++;
    }

    while (j < arr2.length) {
        if (arr2[j] !== union[k - 1]) {
            union.push(arr2[j])
            k++;
        }
        j++;
    }

    return union;
}

let arr1 = [1, 1, 1, 2, 3, 4, 5];
let arr2 = [2, 3, 4, 4, 5];
console.log(unionOfSortedArr(arr1, arr2));


