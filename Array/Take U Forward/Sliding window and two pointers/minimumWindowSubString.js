// Minimum window substring
// s = ddaaabbca, t = abc,
// validAns = aaabbc,aabbc,abbc,bbca,bca // in that we need minimum length for that bca is answer
// ans - bca(exist)
// s = ddaaabbca, t = abbc, ans - abbc(exist)

// string matching is different problem
// let str1 = "abacdabad";
// let str2 = "abad";


// TC - O(2n) + O(n)
// SC - O(n)
function minimumWindowSubString(s, t) {
    let minLength = Infinity;
    let startingIdx = -1;
    let hash = {};
    let count = 0;

    // Build the hash map for the frequency of characters in t
    for (let i = 0; i < t.length; i++) {
        hash[t[i]] = (hash[t[i]] || 0) + 1;
    }

    let left = 0;
    let right = 0;

    // Traverse the string s with the right pointer
    while (right < s.length) {
        // if s[right] is preinserted 
        if (hash[s[right]] > 0) count++;
        hash[s[right]]--;

        // When count matches the length of t, try to minimize the window
        while (count === t.length) {
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                startingIdx = left;
            }

            // Move the left pointer to minimize the window
            hash[s[left]]++;
            if (hash[s[left]] > 0) count--;
            left++;
        }
        right++;
    }

    if (minLength === Infinity) {
        console.log("");
        return "";
    } else {
        console.log(s.substr(startingIdx, minLength));
        return s.substr(startingIdx, minLength);
    }
}

let s = "ddaaabbca";
let t = "abc";
console.log(minimumWindowSubString(s, t));
