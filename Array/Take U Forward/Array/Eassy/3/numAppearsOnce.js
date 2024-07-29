// Find the number that appears once and other numbers twice.

// Brute force approach
// TC - O(n^2)

function numAppearOnce(arr) {
    for (let i = 0; i < arr.length; i++) {
        let num = arr[i];
        let count = 0;
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] == num) {
                count++;
            }
        }
        if (count == 1) {
            return num;
        }
    }
}

let arr = [1, 1, 2, 3, 3, 4, 4];
console.log(numAppearOnce(arr)); // 2