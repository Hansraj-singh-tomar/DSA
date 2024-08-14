// longest repeating characters replacement
// s = AABABBA, k = 2, we can convert only 2 character to achive longest repeating character
// ans - 5 // Changed AABAB to AAAAA


function longRepeatingCharReplacement(str, k) {
    let maxLength = 0;
    let maxFreq = 0;
    for (let i = 0; i < str.length; i++) {
        let hash = {};
        for (let j = i; j < str.length; j++) {
            hash[str[j]] = (hash[str[j]] || 0) + 1;

            maxFreq = Math.max(maxFreq, hash[str[j]])
            // length of substr - maxFreq
            changes = (j - i + 1) - maxFreq;

            if (changes <= k) {
                maxLength = Math.max(maxLength, j - i + 1)
            } else {
                break;
            }
        }
    }

    return maxLength;
}

let str = "AABABBA";
let k = 2;
console.log(longRepeatingCharReplacement(str, k)); // 5 // Changed AABAB to AAAAA

// -----------------------------------------------------------------

// TC - O(2n) * 26
// SC - O(n)

function longRepeatingCharReplacement(str, k) {
    let maxLength = 0;
    let maxFreq = 0;
    let hash = {};
    let left = 0;
    let right = 0;

    while (right < str.length) {
        hash[str[right]] = (hash[str[right]] || 0) + 1;

        maxFreq = Math.max(maxFreq, hash[str[right]]);

        while ((right - left + 1) - maxFreq > k) {
            hash[str[left]]--;
            maxFreq = 0;
            for (let ch in hash) {
                maxFreq = Math.max(maxFreq, hash[ch]);
            }
            left++;
        }

        if ((right - left + 1) - maxFreq <= k) {
            maxLength = Math.max(maxLength, right - left + 1);
        }

        right++;
    }


    return maxLength;
}

// let str = "AABABBA"; // 5
let str2 = "ABBABAA"; // 5
let k2 = 2;
console.log(longRepeatingCharReplacement(str2, k2));


// -------------------------------------------------------------------------------------------


// TC - O(n)
// SC - O(n)

function longRepeatingCharReplacement(str, k) {
    let maxLength = 0;
    let maxFreq = 0;
    let hash = {};
    let left = 0;
    let right = 0;

    while (right < str.length) {
        hash[str[right]] = (hash[str[right]] || 0) + 1;

        maxFreq = Math.max(maxFreq, hash[str[right]]);

        // while ((right - left + 1) - maxFreq > k) {
        if ((right - left + 1) - maxFreq > k) {
            hash[str[left]]--;
            maxFreq = 0;

            // remove this to optimize TC.
            // for (let ch in hash) {
            //     maxFreq = Math.max(maxFreq, hash[ch]);
            // }
            left++;
        }

        if ((right - left + 1) - maxFreq <= k) {
            maxLength = Math.max(maxLength, right - left + 1);
        }

        right++;
    }


    return maxLength;
}

// let str = "AABABBA";
let str3 = "ABBABAA";
let k3 = 2;
console.log(longRepeatingCharReplacement(str3, k3)); // 5 // Changed AABAB to AAAAA
