// brute force approach
// Sliding Window Maximum

// TC - O(n-k) * k
// SC - O()
let nums = [1, 3, -1, -3, 5, 3, 2, 1, 6];
let ans = [];
let k = 3;

for (let i = 0; i <= nums.length - k; i++) {
    let max = nums[i];
    for (let j = i; j < i + k; j++) {
        max = Math.max(max, nums[j])
    }
    ans.push(max);
}

console.log(ans); // [3, 3, 5, 5, 5, 3, 6]

// --------------------------------------------------------

// optimal approach
function slidingWindowMaximum(arr, k) {
    let ans = [];
    let deque = []; // store indices

    for (let i = 0; i < arr.length; i++) {
        // Remove element from the front of the deque if they are out of the current window
        if (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }

        // Remove elements from the back of the deque while they are smaller than the current element
        while (deque.length > 0 && arr[i] >= arr[deque[deque.length - 1]]) {
            deque.pop();
        }

        // Add the current element's index to the deque
        deque.push(i);

        // Once the window has reached size k, add the maximum (front of the deque) to the result
        if (i >= k - 1) { // we are starting from the i = 0, for that we are using k-1 
            ans.push(arr[deque[0]]);
        }
    }

    return ans;
}

// let arr = [1, 3, -1, -3, 5, 3, 7, 1, 6]; // [3, 3, 5, 5, 7, 7, 7] 
let arr = [1, 3, -1, -3, 5, 3, 2, 1, 6]; // [3,3,5,5,5,3,6]
let k = 3;
console.log(slidingWindowMaximum(arr, k)); 
