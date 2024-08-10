// Maximum Product subArray

// TC - O(n^2)
// SC - O(1)
function maxProductSubArray(arr) {
    let maxProduct = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        let product = 1;
        for (let j = i; j < arr.length; j++) {
            product = product * arr[j];
            maxProduct = Math.max(product, maxProduct);
        }
    }

    return maxProduct;
}

let arr = [2, 3, -2, 4];
// let arr = [-2, 3, 4, -1, 0, -2, 3, 1, 4, 0, 4, 6, -1, 4]; // 24 // zero in the array
console.log(maxProductSubArray(arr)); // 6

// ----------------------------------------------------------------------

// Optimal approach -
// 1. observational way
// 2. modification of kaden's algo

// observational way
// TC - O(n)
// SC - O(1)

// Note - If product gets zero than we have to set product = 1;

function maxProductSubArray(arr) {
    let n = arr.length;
    let maxProduct = -Infinity;
    let prefixProduct = 1;
    let suffixProduct = 1;

    for (let i = 0; i < arr.length; i++) {
        if (prefixProduct == 0) prefixProduct = 1;
        if (suffixProduct == 0) suffixProduct = 1;

        prefixProduct = prefixProduct * arr[i];
        suffixProduct = suffixProduct * arr[n - i - 1];
        maxProduct = Math.max(maxProduct, Math.max(prefixProduct, suffixProduct));
    }

    return maxProduct;
}

// let arr2 = [2, 3, -2, 4]; // 6 // even negative
// let arr2 = [3, 2, -1, 4, -6, 3, -2, 6]; // 864 // odd negative
let arr2 = [-2, 3, 4, -1, 0, -2, 3, 1, 4, 0, 4, 6, -1, 4]; // 24 // zero in the array

console.log(maxProductSubArray(arr2)); 
