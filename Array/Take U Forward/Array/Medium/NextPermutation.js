// Next permutation

// Brute force approach
// arr = [3,1,2];
// step 1 - Generate all permution in sorted order using recursion
// step 2 - linear search
// step 3 - then next index permutation is my answer

// ----------------------------------------------------------------

// Optimal approach
// TC - O(3N)

// arr = [2,1,5,4,3,0,0];

// step 1 - longer prefix match
// find the break point(1,5) running reverse loop -> arr[i] < arr[i + 1]

// step 2
// find > 1, but the smallest one, so that you stay close
// swap it with that element

// step 3
// Try to place remaining in the sorted array/order

function nextPermutation(arr) {
    let n = arr.length;
    let breakPoint = -1;
    for (let i = n - 2; i >= 0; i--) {
        if (arr[i] < arr[i + 1]) {
            breakPoint = i;
            break;
        }
    }

    if (breakPoint == -1) {
        arr.sort((a, b) => a - b);
    }

    for (let i = n - 1; i >= 0; i--) {
        if (arr[i] > arr[breakPoint]) {
            [arr[i], arr[breakPoint]] = [arr[breakPoint], arr[i]]
            break;
        }
    }


    while (breakPoint < n) {
        temp = arr[breakPoint + 1];
        arr[breakPoint + 1] = arr[n - 1];
        arr[n - 1] = temp;
        breakPoint++;
        n--;
    }


    return arr;
}

let arr = [2, 1, 5, 4, 3, 0, 0];
// let arr = [5, 4, 3, 2, 1]; // [1,2,3,4,5]
console.log(nextPermutation(arr)); // [2,3,0,0,1,4,5]