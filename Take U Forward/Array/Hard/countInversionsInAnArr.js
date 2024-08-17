// count inversion in an array
// left element must be greater than to right elm => [5,3]
// [5,3,2,4,1] => [5,3], [5,2], [5,4], [5,1], [4,1], [3,2], [3,1], [2,1]

// brute force approach
// TC - O(N^2)
// SC - O(1)

function CountInversion(arr, n) {
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (arr[i] > arr[j]) {
                count += 1;
            }
        }
    }
    return count;
}

let arr = [5, 3, 2, 4, 1];
let n = arr.length;

console.log(CountInversion(arr, n)); // 8 // [5,3], [5,2], [5,4], [5,1], [4,1], [3,2], [3,1], [2,1]


// ----------------------------------------------------------------------------------------------------------

// using merge sort 
// TC = O(nlogn)
// SC = O(n)

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
            count += (mid - left + 1);
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

function mergeSort(arr, low, high) {
    if (low >= high) {
        return
    }
    let mid = Math.floor((low + high) / 2);
    mergeSort(arr, 0, mid);
    mergeSort(arr, mid + 1, high);
    merge(arr, low, mid, high);
}

let arr1 = [5, 3, 2, 4, 1];
console.log(mergeSort(arr1, 0, arr1.length - 1));
console.log(arr1); // [1,2,3,4,5]
console.log(count); // 8 // [5,3], [5,2], [5,4], [5,1], [4,1], [3,2], [3,1], [2,1]


