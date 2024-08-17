// we have to show the count of unique elements from the array.

// TC - O(n)
function removeDuplicate(arr) {
    let setArr = new Set(arr);

    console.log(setArr); // Set(3) {1,2,3}
    console.log(setArr.size); // 3
}

let arr = [1, 1, 1, 2, 2, 2, 3, 3];
console.log(removeDuplicate(arr));

// -----------------------------------------------------------

// Optimal approach - Two pointers
// TC- O(n)

function removeDuplicate(arr) {
    let i = 0;
    for (let j = 1; j < arr.length; j++) {
        if (arr[j] !== arr[i]) {
            arr[i + 1] = arr[j];
            i++;
        }
    }
    return i + 1;
    // return arr.slice(0, i + 1); // [1,2,3]
}

let arr2 = [1, 1, 1, 2, 2, 3, 3];
console.log(removeDuplicate(arr2)); // 3
