// if max val of array more in that case it is not a good solution 
// bcz we are creating array size according to that 

function countingSort(arr, max) {
    const counts = new Array(max + 1).fill(0);
    const sortedArray = [];

    for (let num of arr) {
        counts[num]++;
    }

    console.log(counts); // [0, 1, 2, 2, 1, 0, 0, 0, 1]

    for (let i = 0; i < max; i++) {
        // for (let i = 0; i < max; i++) {
        while (counts[i] > 0) {
            sortedArray.push(i);
            counts[i]--;
        }
    }

    console.log("sorted Array", sortedArray); // [1, 2, 2, 3, 3, 4, 8]

    return sortedArray;
}

// Example usage:
const arr = [4, 2, 2, 8, 3, 3, 1];
const max = Math.max(...arr);
console.log(countingSort(arr, max)); // Output: [1, 2, 2, 3, 3, 4, 8]
