function longestSubStr(str) {
    let hash = {};
    let left = 0;
    let right = 0;
    let maxLength = -Infinity;
    while (right < str.length) {

        // if that char exist in that hash 
        if (hash[str[right]] !== -1) {
            if (left <= hash[str[right]]) {
                left = hash[str[right]] + 1;
            }
        }

        maxLength = Math.max(maxLength, right - left + 1);

        // we are storing char with index in hash map
        hash[str[right]] = right;
        right++;
    }

    console.log(hash);
    return maxLength;
}

let str = "abcabcbb";
console.log(longestSubStr(str)); // 3 // "abc"
