// From coder army
// Time and space complexity - O(n)


// step - 1 => we have to find unique char and count of the unique char
// step - 2 => Then change seen value zero
// step - 3 => while(right < s.length)
// step - 4 => right ko increase karte jana hai jab tak sare unique char window ke andar na aa jaye
// step - 5 => 


function findSmallestWindow(s) {
    if (s.length === 0) {
        return -1; // Handle empty string case
    }

    let seen = {}; // Object to store character counts
    let left = 0, right = 0, minLength = s.length, count = 0;

    // Find all distinct characters in s and store their counts in seen
    for (const char of s) {
        seen[char] = (seen[char] || 0) + 1;
    }

    // unique character count
    let diff = Object.keys(seen).length; // Count of distinct characters

    for (const ch in seen) {
        seen[ch] = 0;
    }
    console.log(seen); // {a: 0, b: 0, c: 0}

    while (right < s.length) {
        // second ko tab tak increase karna hai jab tak sare unique char window ke andar na aa jaye
        // means diff exist karta hai, jab tak vo zero na ban jaye
        while (diff && right < s.length) {
            if (seen[s[right]] == 0) {
                diff--;
            }

            seen[s[right]]++;
            right++;
        }

        minLength = Math.min(minLength, right - left)

        // jab diff zero na ban jaye tab tak window ki size ko decrease karna hai 
        // decrese tab tak karvana hai jab tab vo 1 na ban jaye
        while (diff !== 1) {
            minLength = Math.min(minLength, right - left);
            seen[s[left]]--;

            if (seen[s[left]] == 0) {
                diff++;
            }

            left++;
        }
    }

    return minLength;

}

// Example usage
const s = "aabcbcdbca";
// const s = "AABBBCBBAC"; // 3
const result = findSmallestWindow(s);
console.log("Smallest window:", result); // Output: 4 ("dbca")