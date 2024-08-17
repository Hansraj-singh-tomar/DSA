// Reverse Pair

// let arr = [40, 25, 19, 12, 9, 6, 2];
// arr[i] > 2 * arr[j]
// (6 > 2*2), (9 > 2*2), (12 > 2*2), (19 > 2*2), (40 > 2*2), (25 > 2*2)
// (19 > 2*6), (25 > 2*6), (40 > 2*6)
// (19 > 2*9), (25 > 2*9), (40 > 2*9)
// (40 > 2*12), (25 > 2*12)
// (40 > 19*2)
// output - 15

// ------------------------------------------------------------

// Brute force
// TC - O(n^2)
// SC - O(1)
function reversePair(arr, n) {
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (arr[i] > 2 * arr[j]) {
                count += 1;
            }
        }
    }
    return count;
}

let arr = [40, 25, 19, 12, 9, 6, 2];
console.log(reversePair(arr, arr.length)); // 15

// ---------------------------------------------------

let count = 0;
function merge(arr, low, mid, high) {
    let temp = [];
    let left = low;
    let right = mid + 1;

    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) {
            temp.push(arr[left]);
            left++;
        } else {
            temp.push(arr[right]);
            right++;
        }
    }

    // copying left-out elements from left half
    while (left <= mid) {
        temp.push(arr[left]);
        left++;
    }

    // copying left-out elements from right half
    while (right <= high) {
        temp.push(arr[right]);
        right++;
    }

    // inserting from temp array to original array.
    for (let i = low; i <= high; i++) {
        arr[i] = temp[i - low];
    }
}

function countPairs(arr, low, mid, high) {
    let right = mid + 1;
    for (let i = low; i <= mid; i++) {
        while (right <= high && arr[i] > 2 * arr[right]) {
            right++;
        }
        count += (right - (mid + 1));
    }
}

function mergeSort(arr, low, high) {
    if (low >= high) {
        return
    }
    let mid = Math.floor((low + high) / 2);
    mergeSort(arr, 0, mid);
    mergeSort(arr, mid + 1, high);
    countPairs(arr, low, mid, high);
    merge(arr, low, mid, high);
}

let arr1 = [5, 3, 2, 4, 1];
mergeSort(arr1, 0, arr1.length - 1);
// console.log(arr1); // [1,2,3,4,5]
console.log(count); // 4  // [5, 2*1] [3, 2*1] [4, 2*1] [5 > 2*2]