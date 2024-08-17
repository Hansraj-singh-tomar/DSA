// TC - O(n^2)
// SC - O(n)
function longestSubStr(str) {
    let maxLength = -Infinity;
    for (let i = 0; i < str.length; i++) {
        let seen = {};

        for (let j = 0; j < str.length; j++) {
            if (seen[str[j]] == 1) break;

            maxLength = Math.max(maxLength, j - i + 1)
            seen[str[j]] = 1;
        }
    }

    return maxLength;
}


// let str = "abaabc";
const str2 = "abcabcbb";
console.log(longestSubStr(str2)); // 3 // "abc"


// -------------------------------------------------------------------------------


// TC - O(n)
// SC - O(n)
function longestSubStr(str) {
    let left = 0;
    let right = 0;
    let seen = {};
    let maxLength = 0;

    while (right < str.length) {

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


const str3 = "abcabcbb";
console.log(longestSubStr(str3)); // 3 // "abc"

// -------------------------------------------------------------

// TC - O(n)
// SC - O(n)

function longestSubStr(str) {
    let hash = {};
    let left = 0;
    let right = 0;
    let maxLength = -Infinity;
    while (right < str.length) {

        // if char exist in that hash, then we move to our left pointer
        // left = hash[str[right]] + 1;
        if (hash[str[right]] !== -1) {
            // we are shifting left pointer  
            if (left <= hash[str[right]]) {
                left = hash[str[right]] + 1;
            }
        }

        maxLength = Math.max(maxLength, right - left + 1);

        // we are storing char with index in that hash map
        hash[str[right]] = right;
        right++;
    }

    console.log(hash);
    return maxLength;
}

let str = "abcabcbb";
console.log(longestSubStr(str)); // 3 // "abc"
// let str = "cadbzabcd"; // cadbz