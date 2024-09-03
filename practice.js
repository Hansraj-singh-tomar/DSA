function slidingWindowMaximum(arr, k) {
    let ans = [];
    let deque = [];

    for (let i = 0; i < arr.length; i++) {
        // check it is valid current window, remove from the dequeue
        if (deque.length > 0 && deque[0] <= i - k) {
            deque.pop();
        }

        while (arr[i] >= arr[deque[deque.length - 1]]) {
            deque.pop();
        }

        deque.push(i);

        if (i >= k - 1) {
            ans.push(arr[deque[0]]);
        }
    }
    return ans;
}

let arr = [1, 3, -1, -3, 5, 3, 7, 1, 6];
let k = 3;
console.log(slidingWindowMaximum(arr, k));

