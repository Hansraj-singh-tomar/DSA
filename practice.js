// Trapping Rain Water/container with most water

function trappingRainWater(arr) {
    let totalStoreWater = 0;
    let prefixMax = [];
    let suffixMax = [];

    prefixMax[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
        prefixMax[i] = Math.max(prefixMax[i - 1], arr[i])
    }

    suffixMax[arr.length - 1] = arr[arr.length - 1];
    for (let j = arr.length - 2; j >= 0; j--) {
        suffixMax[j] = Math.max(suffixMax[j + 1], arr[j])
    }

    let leftMax = 0;
    let rightMax = 0;

    for (let i = 0; i < arr.length; i++) {
        leftMax = prefixMax[i];
        rightMax = suffixMax[i];

        if (arr[i] < leftMax && arr[i] < rightMax) {
            totalStoreWater += Math.min(leftMax, rightMax) - arr[i]
        }
    }

    console.log(prefixMax); // [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3]
    console.log(suffixMax); // [3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1]

    return totalStoreWater;
}

let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(trappingRainWater(arr)); // 6


