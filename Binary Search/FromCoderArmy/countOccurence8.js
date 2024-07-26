function countOfOccurrence(arr, target, start, end) {
    let firstIndex = -1;
    let lastIndex = -1;

    // first element - right side 
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        if (arr[mid] == target) {
            firstIndex = mid;
            end = mid - 1;
        } else if (arr[mid] < target) {
            start = mid + 1;
        } else if (arr[mid] > target) {
            end = mid - 1;
        }
    }

    // last element - left side 
    start = 0;
    end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        if (arr[mid] == target) {
            lastIndex = mid;
            start = mid + 1;
        } else if (arr[mid] < target) {
            start = mid + 1;
        } else if (arr[mid] > target) {
            end = mid - 1;
        }
    }

    return (lastIndex - firstIndex) + 1;
}

let arr = [2, 4, 4, 4, 5, 6];
console.log(countOfOccurrence(arr, 4, 0, arr.length - 1)); // 3 // occurence of 4 is 3
