// Coder Army
// Q. Longest Prefix and suffix
// console.log(prefixArr); // ['A', 'AB', 'ABC', 'ABCD', 'ABCDE', 'ABCDEA', 'ABCDEAB', 'ABCDEABC']
// console.log(suffixArr); // ['D', 'CD', 'BCD', 'ABCD', 'EABCD', 'DEABCD', 'CDEABCD', 'BCDEABCD']
// in that we have to check which is equal.



// Brute force - from chatgpt
function longestPrefixAndSuffix(str) {
    let n = str.length;
    let prefixArr = [];
    let suffixArr = [];

    // Build prefix array
    for (let i = 0; i < n - 1; i++) {
        let prefix = '';
        for (let j = 0; j <= i; j++) {
            prefix += str[j];
        }
        prefixArr.push(prefix);
    }

    // Build suffix array
    for (let i = n - 1; i > 0; i--) {
        let suffix = '';
        for (let j = i; j < n; j++) {
            suffix += str[j];
        }
        suffixArr.push(suffix);
    }

    console.log(prefixArr);
    console.log(suffixArr);

    // Find the longest common prefix and suffix
    let longest = '';
    for (let i = 0; i < prefixArr.length; i++) {
        // if (prefixArr[i] === suffixArr[suffixArr.length - 1 - i]) {
        if (prefixArr[i] === suffixArr[i]) {
            longest = prefixArr[i];
        }
    }

    return longest;
}

console.log(longestPrefixAndSuffix("ABCDEABCD"));  // Output: 4 // "ABCD"


// --------------------------------------------------------------------------

// By Coder Army
// Time complexity O(n)

function longestPrefixAndSuffix(str) {
    let start = 0;
    let end = 1; // end must be start from 1, keep on eye here
    let lps = new Array(str.length).fill(0);

    while (end < str.length) {
        if (str[start] == str[end]) {
            lps[end] = start + 1;
            end++;
            start++;
        } else {
            if (start == 0) {
                lps[end] = 0;
                end++;
            } else {
                start = lps[start - 1]
            }
        }
    }

    console.log(str.slice(start + 1, end)); // ABCD
    return lps[str.length - 1];
}

let str = "ABCDEABCD"
console.log(longestPrefixAndSuffix(str)); // 4

