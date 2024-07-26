// From coder army
// Brute force 

function stringMatching(str1, str2) {
    let m = str1.length;
    let n = str2.length;

    for (let i = 0; i <= m - n; i++) {
        first = i;
        second = 0;

        while (second < n) {
            if (str1[first] !== str2[second]) {
                break;
            } else {
                first++;
                second++;
            }
        }
        if (second == n) {
            return first - second;
        }
    }

    return -1;
}

let str1 = "abacdabad";
let str2 = "abad";
console.log(stringMatching(str1, str2)); // 5(from 5th index over str2 is being matched)


// ----------------------------------------------------------------------

// 28. Find the index of the first occurrence in a string

function stringMatching(str1, str2) {
    // firstly we create lps for the str2
    let start = 0;
    let end = 1;
    let lps = new Array(str2.length).fill(0);

    while (end < str2.length) {
        if (str2[start] == str2[end]) {
            lps[end] = start + 1;
            end++;
            start++;
        } else {
            if (start == 0) {
                lps[end] = 0;
                end++;
            } else {
                start = lps[start - 1];
            }
        }
    }

    console.log(lps); // [0, 0, 1, 0]

    // now we write code of string matching
    let first = 0;  // this will point to first string
    let second = 0; // this will point to second string

    while (first < str1.length && second < str2.length) {
        // match

        if (str1[first] == str2[second]) {
            first++;
            second++;
        }
        // not match
        else {
            if (second == 0) {
                first++;
            } else {
                second = lps[second - 1];
            }
        }
    }

    // if answer exist then 
    if (second == str2.length) {
        return first - second;
    }

    return -1;
}

let str1 = "abacdabad";
let str2 = "abad";
console.log(stringMatching(str1, str2)); // 5 // 5th index se meri string match ho rhi hai

