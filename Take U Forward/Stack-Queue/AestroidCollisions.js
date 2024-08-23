// Asteroid Collision
// arr = [4,7,1,1,2,-3,-7,17,15,-16]
// every elm is asteroid and every positive asteroid move toward right direction and negative asteroid move toward left direction
// on collision smallest asteroid will get destroid (2, -3) => 2 will get destroy
// on collision of equel asteroid both asteroid will get destroy

// TC - O(2n)
// SC - O(n)
function asteroidCollision(arr) {
    let stack = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            stack.push(arr[i]);
        } else {
            while (stack.length !== 0 && stack[stack.length - 1] > 0 && stack[stack.length - 1] < Math.abs(arr[i])) {
                stack.pop();
            }

            if (stack.length !== 0 && stack[stack.length - 1] == Math.abs(arr[i])) {
                stack.pop();
            } else if (stack.length == 0 && arr[i] < 0) {
                stack.push(arr[i])
            }
        }
    }

    return stack;
}

let arr = [4, 7, 1, 1, 2, -3, -7, 17, 15, -16];
console.log(asteroidCollision(arr)); // [4,17]
