// Maximum consecutive number of 1's

function maxConsecutiveNumber(arr) {
    let max = 0;
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 1) {
            max = Math.max(count, max);
            count = 0;
        }
        count++;
    }
    return max
}

let arr = [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1];
console.log(maxConsecutiveNumber(arr));  // 4