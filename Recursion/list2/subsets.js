// power set => set of all subsets
// exclude or include vali game khelni hai

// let arr = [1,2,3]
// output = [[], [1], [1,2], [1,3], [2], [2,3], [3], [1,2,3]]
// totalElm = 8 => 2^n => 2^3 and n = arr.length


// function subsets(arr) {
//     let ans = [[]];

//     for (let elm of arr) {
//         let newSubsets = [];
//         for (let subset of ans) {
//             newSubsets.push([...subset, elm])
//         }
//         ans.push(...newSubsets)
//     }

//     return ans;
// }

// let arr = [1, 2, 3]
// console.log(subsets(arr))

// -----------------------------------------------------

// making above code simple 
function subsets(arr) {
    let ans = [[]];

    for (let i = 0; i < arr.length; i++) {
        let currentSize = ans.length;
        for (let j = 0; j < currentSize; j++) {
            let newSubset = ans[j].slice();  // Create a new subset based on the current subset
            newSubset.push(arr[i]);          // Add the current element to the new subset
            ans.push(newSubset);             // Add the new subset to the answer array
        }
    }

    return ans;
}

// Example usage:
let arr = [1, 2, 3];
console.log(subsets(arr));


// ---------------------------------------------------

// using recursion

// function subsets(nums) {
//     let res = [];

//     function backTrack(start, path) {
//         res.push([...path]);
//         for (let i = start; i < nums.length; i++) {
//             path.push(nums[i]);
//             backTrack(i + 1, path);
//             path.pop();
//         }
//     }

//     backTrack(0, []);
//     return res;
// }

// console.log(subsets([1, 2, 3]));

// --------------------------------------------------------------------------

// using another approach - using recursion - from love babbar

function subsets(arr, output, index, ans) {
    if (index >= arr.length) {
        ans.push([...output]); // shallow copy 
        return;
    }

    // exclude
    subsets(arr, output, index + 1, ans);

    // include
    let element = arr[index];
    output.push(element);
    subsets(arr, output, index + 1, ans);

    // Backtrack to remove the element added above
    output.pop();
}

let arr = [1, 2, 3];
let ans = [];
subsets(arr, [], 0, ans)
console.log(ans);


// logic

// 1. Problem
// let ans = [];
// let output = [1]
// ans.push(output);
// console.log(ans); // [[1]]
// output.push(2)
// console.log(output); // [1,2]
// console.log(ans); // [[1,2]] // value of array must be [1] but it get changed

// 2. solution
let ans = [];
let outout = [1];
ans.push([...output]);
console.log(ans); // [[1]]
output.push(2);
console.log(output); // [1,2]
console.log(ans); // [[1]]
