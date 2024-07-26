// Time complexity => O(n)
// space complexity => O(n)
function trappingRainWater(height, n) {
    let maxLeft = [0];
    let maxRight = [];
    for (let i = 1; i < n; i++) {
        maxLeft[i] = Math.max(maxLeft[i - 1], height[i - 1]);
    }
    maxRight[n - 1] = 0;
    for (let i = n - 2; i >= 0; i--) {
        maxRight[i] = Math.max(maxRight[i + 1], height[i + 1]);
    }

    console.log(maxLeft); // [0, 4, 4, 4, 5, 5, 6, 6]
    console.log(maxRight); // [6, 6, 6, 6, 6, 3, 3, 0]

    // [0, 2, 4, 0, 3, 0, 1] => 10(sum of this array) // but ham direct solve kar rhe hai isse

    let water = 0;
    let minHeight;
    for (let i = 0; i < n; i++) {
        minHeight = Math.min(maxLeft[i], maxRight[i]);

        if (minHeight - height[i] >= 0) {
            water += minHeight - height[i];
        }
    }

    return water;
}

let height = [4, 2, 0, 5, 2, 6, 2, 3];
console.log(trappingRainWater(height, height.length)); // 10 => [0, 2, 4, 0, 3, 0, 1] sum of this array

// -------------------------------------------------------------------------

// second method
// Time Complexity - O(n)
// Space Complexity - O(1)

function trappingRainWater(height, n) {
    let maxLeft = 0;
    let maxRight = 0;
    let maxHeight = height[0];
    let index = 0;
    let water = 0;

    for (let i = 1; i < n; i++) {
        if (height[i] > maxHeight) {
            maxHeight = height[i];
            index = i;
        }
    }

    for (let i = 0; i < index; i++) {
        // right me 6 hai and left me suppose 4 then we have to choose minimum value
        // isliye ham Math.min(leftMax, rightMax) nhi kar rhe hai

        if (maxLeft > height[i]) {
            water += maxLeft - height[i];
        } else {
            maxLeft = height[i];
        }
    }

    for (let i = n - 1; i > index; i--) {
        if (maxRight > height[i]) {
            water += maxRight - height[i];
        } else {
            maxRight = height[i];
        }
    }

    return water;
}

let height = [4, 2, 0, 5, 2, 6, 2, 3];
console.log(trappingRainWater(height, height.length)); // 10


// -----------------------------------------------------

// Using Two pointers approach
// Time complexity - O(n)
// space complexity - O(1)
// in that we are iterating array at only, that's the difference

function trappingRainWater(arr, n) {
    let left = 0;
    let right = n - 1;
    let water = 0;
    let leftMax = 0;
    let rightMax = 0;

    while (left < right) {
        if (arr[left] < arr[right]) {
            if (arr[left] > leftMax) {
                leftMax = arr[left];
            } else {
                water += leftMax - arr[left];
            }
            left++;
        } else {
            if (arr[right] >= rightMax) {
                rightMax = arr[right]
            } else {
                water += rightMax - arr[right];
            }
            right--;
        }
    }

    return water
}

let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(trappingRainWater(arr, arr.length));

