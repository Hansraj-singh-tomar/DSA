// Longest Consecutive sequence
// let arr = [102, 4, 100, 1, 101, 3, 2, 1, 1];
// ans = [1,2,3,4], this is not ans = [100, 101, 102]

// Brute force approach
// TC - O(n^2)
function longestConsecutiveSequence(arr) {
    let max = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        let x = arr[i];
        x = x + 1;
        let count = 1;

        let j = 0;
        while (j < arr.length) {
            if (x == arr[j]) {
                count += 1;
                x += 1;
                j = 0;
            } else {
                j++;
            }
        }

        // another way
        // for (let j = 0; j < arr.length; j++) {
        //     if (x == arr[j]) {
        //         count = count + 1;
        //         x = x + 1;
        //         j = 0;
        //     }
        // }

        max = Math.max(count, max);
    }

    return max;
}

let arr = [102, 4, 100, 1, 101, 3, 2, 1, 1];
console.log(longestConsecutiveSequence(arr)); // 4 // [1,2,3,4]

// ----------------------------------------------------------------------------------------------

// Better approach -
// TC - O(n + nlogn)

function longestConsecutiveSequence(arr) {
    let longest = 0;
    let count = 1;
    let lastSmaller = -Infinity;

    // instead of sort we can use the new Set method for this 
    arr = arr.sort((a, b) => a - b);

    // console.log(arr); // [1, 1, 1, 2, 2, 2, 3, 3, 4, 100, 100, 101, 101, 102]

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] - 1 == lastSmaller) {
            count++;
            lastSmaller = arr[i]
        } else if (arr[i] !== lastSmaller) {
            count = 1;
            lastSmaller = arr[i];
        }
        longest = Math.max(longest, count);
    }


    return longest;
}

let arr1 = [100, 102, 100, 101, 101, 4, 3, 2, 3, 2, 1, 1, 1, 2]
console.log(longestConsecutiveSequence(arr1)); // 4 // [1,2,3,4]

// ---------------------------------------------------------------------------

// optimal approach - this is uncomplete solution
// TC - O(n)

function longestConsecutiveSequence(arr) {
    let numSet = new Set(arr);
    let maxLength = 0;

    for (let num of numSet) {
        // Check if 'num' is the start of a sequence
        if (!numSet.has(num - 1)) {
            let startNum = num;
            let count = 1;

            while (numSet.has(startNum + 1)) {
                startNum += 1;
                count += 1;
            }

            maxLength = Math.max(maxLength, count);
        }

        // another way
        // let count = 1;
        // let x = num + 1;
        // while (set.has(x)) {
        //     x += 1;
        //     count++;
        // }
        // max = Math.max(count, max)
    }
    return maxLength
}

let arr2 = [100, 102, 100, 101, 101, 4, 3, 2, 3, 2, 1, 1, 1, 2];
console.log(longestConsecutiveSequence(arr2));
