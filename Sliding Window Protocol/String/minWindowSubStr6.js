// minimum length window substring
// s = ADOBECODEBANC
// t = ABC
// ans = BANC => [ADOBEC, CODEBA, BANC]

function minWindowSubStr(s, t) {
    let map = {};
    let start = 0;
    let end = 0;
    let total = t.length;
    let minLength = Infinity;
    let index = -1;

    // ans = min length of our string
    // index = starting index of our answer

    for (let elm of t) {
        if (map[elm]) {
            map[elm]++;
        } else {
            map[elm] = 1;
        }
    }
    // console.log(map); // {A: 1, B: 1, C: 1}

    while (end < s.length) {
        map[s[end]] = (map[s[end]] || 0) - 1;  // decrease the count of char
        if (map[s[end]] >= 0) { // if count is not negative
            total--; // decrease the total
        }

        // can we decrease the size of window
        while (!total && start <= end) {
            // update the length of substring 
            if (minLength > end - start + 1) {
                minLength = end - start + 1;
                index = start;
            }

            map[s[start]]++; // increase the count of character

            if (map[s[start]] > 0) { // if count is positive
                total++; // increase the total
            }

            start++; // move the start, decrease the size of substring
        }

        // increase the size of window
        end++;
    }

    console.log(map); // {A: 0, B: 1, C: 0, D: 0, O: 0, D: 0, N: -1}

    if (index == -1) return "";

    let str = " ";

    for (let i = index; i < index + minLength; i++) {
        str += s[i];
    }
    return { str, minLength };
}

// exp - 1
let s = "ADOBECODEBANC";
let t = "ABC"

// exp - 2
// let s = "a";
// let t = "aa";

console.log(minWindowSubStr(s, t)); // {str: 'BANC', ans: 4}