// Brute force approach
// Time complexity - O(n^2)

function longestUniqueSubstring(str) {
    let maxLength = 0;
    let currentLength = 0;
    let seen = {}; // Object to track seen characters

    for (let i = 0; i < str.length; i++) {
        currentLength = 0;
        seen = {}; // Reset seen characters for each starting position

        for (let j = i; j < str.length; j++) {
            const char = str[j];
            // if (seen[char] == true) {
            if (seen[char] !== undefined) {
                break; // Repeat found, move to next starting position
            }
            seen[char] = true;
            currentLength++;
            maxLength = Math.max(maxLength, currentLength);
        }
    }

    return maxLength;
}

// Example usage
const str = "abcabcbb";
const result = longestUniqueSubstring(str);
console.log("Longest unique substring:", result); // Output: 3 ("abc")

// ------------------------------------------------------------------------------

// Time complexity = O(n)
// from Bard/Gemini

function longestSubStr(str) {
    let left = 0;
    let right = 0;
    let seen = {};
    let maxLength = 0;

    while (right < str.length) {
        // if (seen[str[right]]) {
        //     seen[str[right]] += 1;
        // } else {
        //     seen[str[right]] = 1;
        // }
        seen[str[right]] = (seen[str[right]] || 0) + 1; // updating the count of character 

        // sliding window if character repeats
        // while (seen[str[right]] > 1) {
        if (seen[str[right]] > 1) {
            seen[str[left]]--; // Decrcement count of leftmost character 
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
        right++;
    }

    // return str.slice(left, right); // "abc"
    return maxLength;
}


// let str = "abaabc";
const str2 = "abcabcbb";
console.log(longestSubStr(str2)); // 3 // "abc"

// ---------------------------------------------------------------

// from the take u forward

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

let str3 = "abcabcbb";
console.log(longestSubStr(str3)); // 3 // "abc"
