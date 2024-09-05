function removeAllAdjacentDuplicatesII(str, k) {
    let stack = [];

    for (let char of s) {
        if (stack.length > 0 && stack[stack.length - 1][0] === char) {
            stack[stack.length - 1][1]++;
            if (stack[stack.length - 1][1] === k) {
                stack.pop(); // Remove the group if its count reaches k
            }
        } else {
            stack.push([char, 1]); // Push the character with a count of 1
        }
    }

    let res = "";
    for (let [char, count] of stack) {
        res += char.repeat(count); // Rebuild the string from the stack
    }

    return res;
}

console.log(removeAllAdjacentDuplicatesII("deeedbbcccbdaa", 3)); // "aa"
