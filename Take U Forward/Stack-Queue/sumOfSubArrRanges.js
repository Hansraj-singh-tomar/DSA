// TC - O(n^2)
function sumOfSubArrRanges(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        let longest = arr[i];
        let smallest = arr[i];

        for (let j = i; j < arr.length; j++) {
            smallest = Math.min(arr[j], smallest);
            longest = Math.max(arr[j], longest);

            sum = sum + (longest - smallest);
        }
    }

    return sum
}

let arr = [1, 4, 3, 2];
console.log(sumOfSubArrRanges(arr)); // 13

// -----------------------------------------------------------------------------

// TC - O(5n)
// SC - O(5n)
// similar to sum of subarray minimum
// solution => sum of subarray maximum - sum of subarray minimum