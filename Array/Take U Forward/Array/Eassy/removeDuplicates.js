// TC - O(n)
function removeDuplicate(arr) {
    let setArr = new Set(arr);

    console.log(setArr); // Set(3) {1,2,3}
    console.log(setArr.size); // 3
}

let arr = [1, 1, 1, 2, 2, 2, 3, 3];
console.log(removeDuplicate(arr));

// -------------------------------------------------


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
}

let arr2 = [1, 1, 1, 2, 2, 3, 3];
console.log(removeDuplicate(arr2)); // 3