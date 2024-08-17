// Number of substrings containing all three characters
// s = bbacba // ans - 9 // bbac, bbacb, bbacba, bac, bacb, bacba, acb, acba, cba

function numOfSubstr(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        let hash = {};
        for (let j = i; j < str.length; j++) {
            hash[str[j].charCodeAt() - 'a'.charCodeAt()] = 1;

            if (hash[0] + hash[1] + hash[2] == 3) {
                // count = count + 1;

                // agar hame three distinct elm mil gye hai to count + (str.length - j) karke aage iteration karne ki koi jarurat nhi hai
                count = count + (str.length - j);
                break;
            }
        }
        // console.log(hash); // {0: 1, 1: 1, 2: 1}
    }
    return count;
}

let str = "bbacba";
console.log(numOfSubstr(str)); // 9 // bbac, bbacb, bbacba, bac, bacb, bacba, acb, acba, cba


// --------------------------------------------------------------------------------------------------

// TC - O(n)
// SC - O(1)

function numOfSubstr(s) {
    let count = 0;
    let lastOccurrence = { 'a': -1, 'b': -1, 'c': -1 };

    for (let i = 0; i < str.length; i++) {
        lastOccurrence[s[i]] = i;

        // Find the minimum index among the last occurrences of 'a', 'b', and 'c'
        let minIndex = Math.min(lastOccurrence['a'], lastOccurrence['b'], lastOccurrence['c']);


        // If all characters have been seen at least once, 
        // count all substrings ending at the current position that contain all three characters
        if (minIndex !== -1) {
            count += minIndex + 1;
        }
    }

    return count;
}

let s = "bbacba";
console.log(numOfSubstr(s)); // 9 // bbac, bbacb, bbacba, bac, bacb, bacba, acb, acba, cba
