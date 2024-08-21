function prefixMax(arr) {
    let prefixMax = [];
    prefixMax[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
        prefixMax[i] = Math.max(prefixMax[i - 1], arr[i])
    }
    return prefixMax;
}
let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(prefixMax(arr)); // [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3]


function suffixMax(arr) {
    let suffixMax = [];
    suffixMax[arr.length - 1] = arr[arr.length - 1];

    for (let i = arr.length - 2; i >= 0; i--) {
        suffixMax[i] = Math.max(suffixMax[i + 1], arr[i])
    }

    return suffixMax;
}

let arr2 = [1, 11, 2, 10];
console.log(suffixMax(arr2)); // [11, 11, 10,10]
