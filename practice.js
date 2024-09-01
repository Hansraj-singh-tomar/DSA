// Sliding Window Maximum

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
