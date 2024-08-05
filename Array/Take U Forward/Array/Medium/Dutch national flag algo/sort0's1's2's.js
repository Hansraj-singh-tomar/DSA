// Maximum consecutive number of 1's

// Brute force approach
// TC - O(n1 + n2 + n3 + n4)

function sort012(arr) {

    // first we remember the count of 0, 1, 2
    // then on every loop according to their count we push 0, 1, 2 into the array

    let count0 = 0;
    let count1 = 0;
    let count2 = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 0) {
            count0++;
        } else if (arr[i] == 1) {
            count1++;
        } else if (arr[i] == 2) {
            count2++;
        }
    }

    for (let j = 0; j < count0; j++) {
        arr[j] = 0;
    }

    for (let j = count0; j < count1 + count0; j++) {
        arr[j] = 1;
    }

    for (let j = count0 + count1; j < arr.length; j++) {
        arr[j] = 2;
    }

    return arr;
}


let arr = [0, 1, 2, 0, 1, 2, 1, 2, 0, 0, 0, 1];
console.log(sort012(arr));  // [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2];

// ----------------------------------------------------------

// using dutch national flag algorithm
// TC - O(n)
// SC - O(1)
// [0....low-1] ---> 0 (extream left)
// [low.....mid-1] ----> 1
// [high+1, n-1] ------> 2 (extream right)

function sort012(arr2) {
    let low = 0;
    let mid = 0;
    let high = arr2.length - 1;

    while (mid <= high) {
        if (arr2[mid] == 0) {
            [arr2[mid], arr2[low]] = [arr2[low], arr2[mid]];
            mid++;
            low++;
        } else if (arr2[mid] == 1) {
            mid++;
        } else {
            [arr2[mid], arr2[high]] = [arr2[high], arr2[mid]];
            high--;
        }
    }

    return arr2;
}

let arr2 = [0, 1, 2, 0, 1, 2, 1, 2, 0, 0, 0, 1];
console.log(sort012(arr2));  // [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2];
