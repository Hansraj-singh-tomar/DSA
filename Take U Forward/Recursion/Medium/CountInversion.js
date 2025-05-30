// Optimal approach - using merge sort
// the whole code of merge sort just one line is added in that code which is - count += (mid - left + 1)
// inside the merge function in the else part.

// TC - nlogN

// Note - In that we are creating a global variable to count
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
            count += (mid - left + 1);
            right++;
        }
    }

    while (left <= mid) {
        temp.push(arr[left]);
        left++;
    }

    while (right <= mid) {
        temp.push(arr[right]);
        right++;
    }

    let tempIndex = 0;
    for (let i = low; i <= high; i++) { // loop must be from low to high not 0 to arr.length-1
        arr[i] = temp[tempIndex];
        tempIndex++;
    }
}

function mergeSort(arr, low, high) {
    if (low >= high) {
        return;
    }

    let mid = Math.floor((low + high) / 2);

    mergeSort(arr, low, mid);
    mergeSort(arr, mid + 1, high);
    merge(arr, low, mid, high);
}

let arr = [5, 3, 2, 4, 1];
mergeSort(arr, 0, arr.length - 1);
console.log(arr);
console.log(count); // 8 // [[5,3], [5,2], [5,4], [5, 1], [3,2], [3,1], [2,1], [4,1]]

// -----------------------------------------------------------------------------

// Without using the global count variable 
function merge(arr, low, mid, high) {
    let count = 0;
    let temp = [];
    let left = low;
    let right = mid + 1;


    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) {
            temp.push(arr[left]);
            left++;
        } else {
            temp.push(arr[right]);
            count += (mid - left + 1);
            right++;
        }
    }

    while (left <= mid) {
        temp.push(arr[left]);
        left++;
    }

    while (right <= mid) {
        temp.push(arr[right]);
        right++;
    }

    let tempIndex = 0;
    for (let i = low; i <= high; i++) { // loop must be from low to high not 0 to arr.length-1
        arr[i] = temp[tempIndex];
        tempIndex++;
    }

    return count;
}

function mergeSort(arr, low, high) {
    let count = 0;
    if (low >= high) {
        return count;
    }

    let mid = Math.floor((low + high) / 2);

    count += mergeSort(arr, low, mid);
    count += mergeSort(arr, mid + 1, high);
    count = merge(arr, low, mid, high);
    return count;
}

let arr2 = [5, 3, 2, 4, 1];
mergeSort(arr2, 0, arr2.length - 1);
console.log(arr2);
console.log(count); // 8 // [[5,3], [5,2], [5,4], [5, 1], [3,2], [3,1], [2,1], [4,1]]