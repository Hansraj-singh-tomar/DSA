// Longest substring with at most k distinct characters

// s = aaabbccd  k = 2
// ans - 5 // aaabb

// Brute force
// we will create subStrings
// TC - O(n^2)
// SC - O(n)

function longSubStrWithAtMostKDistinctChar(str, k) {
    let maxLength = 0;
    let map = {};

    for (let i = 0; i < str.length; i++) {
        map = {};

        for (let j = i; j < str.length; j++) {
            map[str[j]] = (map[str[j]] || 0) + 1;

            if (Object.keys(map).length <= k) {
                maxLength = Math.max(maxLength, j - i + 1);
            } else {
                break;
            }
        }
    }

    return maxLength;
}

let str = "aaabbccd";
let k = 2;
console.log(longSubStrWithAtMostKDistinctChar(str, k)); // 5 // aaabb // it has k unique element

// ----------------------------------------------------------------------------------------------------------

// optimize approach
// TC - O(n)
// SC - O(n)

function longSubStrWithAtMostKDistinctChar(str, k) {
    let maxLength = 0;
    let hash = {};
    let right = 0;
    let left = 0;

    while (right < str.length) {
        hash[str[right]] = (hash[str[right]] || 0) + 1;

        // while(Object.keys(hash).length > k) { // if we will use while then TC - O(2n)
        if (Object.keys(hash).length > k) {
            hash[str[left]]--;
            // delete property who's value is zero
            if (hash[str[left]] == 0) {
                delete hash[str[left]];
            }
            left++;
        }

        if (Object.keys(hash).length <= k) {
            maxLength = Math.max(maxLength, right - left + 1);
        }

        right++;
    }

    return maxLength;
}

let str2 = "aabbcccd";
let k2 = 2;
console.log(longSubStrWithAtMostKDistinctChar(str2, k2)); // 5 // bbccc // it has k unique element
