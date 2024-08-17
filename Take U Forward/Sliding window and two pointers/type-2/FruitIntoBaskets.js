// fruit into basket
// treesWithDifferentTypeOfFruits = [3,3,3,1,2,1,1,2,3,3,4];

// Note - max length subArray with at most 2 types of numbers.

// i can push 2 types of fruits in that
// basket1 = []; // same type fruits you can put in that basket


// TC - O(n^2)
function fruitIntoBasket(arr, type) {
    let maxLength = 0;

    for (let i = 0; i < arr.length; i++) {
        let set = new Set();
        for (let j = i; j < arr.length; j++) {
            set.add(arr[j]);

            if (set.size <= type) {
                maxLength = Math.max(maxLength, j - i + 1);
            } else {
                break;
            }
        }
    }

    return maxLength;
}

let arr = [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4];
let type = 2;
console.log(fruitIntoBasket(arr, type)); // 5 // [1,2,1,1,2]

// --------------------------------------------------------------------------

// TC - o(2n)
// SC - O(n)

function fruitIntoBasket(arr, type) {
    let hash = {};
    let left = 0;
    let right = 0;
    let maxLength = 0;
    while (right < arr.length) {
        hash[arr[right]]++;
        // = (hash[arr[right]] || 0) + 1;

        // we are shrinking window 
        while (Object.keys(hash).length > type) {
            hash[arr[left]]--;
            if (hash[arr[left]] == 0) {
                delete hash[arr[left]];
            }
            left++;
        }

        if (Object.keys(hash).length <= type) {
            maxLength = Math.max(maxLength, right - left + 1);
        }
        right++;
    }
    return maxLength;
}

let arr1 = [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4];
let type1 = 2;
console.log(fruitIntoBasket(arr1, type1)); // 5

// ---------------------------------------------------------------------------

// TC - o(n)
// SC - O(n)

function fruitIntoBasket(arr, type) {
    let hash = {};
    let left = 0;
    let right = 0;
    let maxLength = 0;
    while (right < arr.length) {
        hash[arr[right]] = (hash[arr[right]] || 0) + 1;

        // we are shrinking window if hash length is more than to 2 
        if (Object.keys(hash).length > type) {
            hash[arr[left]]--;
            if (hash[arr[left]] == 0) {
                delete hash[arr[left]];
            }
            left++;
        }

        if (Object.keys(hash).length <= type) {
            maxLength = Math.max(maxLength, right - left + 1);
        }
        right++;
    }
    return maxLength;
}

let arr2 = [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4];
let type2 = 2;
console.log(fruitIntoBasket(arr2, type2)); // 5


