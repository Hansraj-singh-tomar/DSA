function isPalindrome(s, start, end) {
    while (start < end) {
        if (s[start] !== s[end]) return false
        start++;
        end--;
    }
    return true;
}

function partitionHelper(s, start, path, result) {
    if (start === s.length) {
        result.push([...path]);
        return;
    }

    for (let end = start; end < s.length; end++) {
        if (isPalindrome(s, start, end)) {
            path.push(s.substring(start, end + 1));
            partitionHelper(s, end + 1, path, result);
            path.pop(); // backtrack
        }
    }
}

function partition(s) {
    const result = [];
    partitionHelper(s, 0, [], result);
    return result;
}

// Example usage
const input = "aab";
const output = partition(input);
console.log("All palindrome partitions:");
console.log(output);