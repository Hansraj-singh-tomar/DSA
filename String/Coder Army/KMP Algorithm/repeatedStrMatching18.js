// Repeated String Match
// a = abcd  (4) // iss string ko kitni bar repeat karoge ki string b uska substring ban jaye
// b = cdabcdab (8)

// exp : - abcd + abcd + abcd = abcdabcdabcd // now string b iss string me present hai
// ans = 3 // bcz string ko mene three time repeat kiya hai

// condition
// 1. string ko tab tak repeat karte jana hai jab tak ko second string ki size ke brabar na aa jaye or
// 2. or ek bar extra add kar denge string ko usse jayada bar string ko add nhi karna hai
// 3. usse jyada bar add karne par hame return -1 kar dena hai

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

    // console.log(lps); // [0, 0, 1, 0]

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
        return 1;
    }

    return 0;
}


function repeatedString(str1, str2) {
    if (str1 == str2) {
        return true;
    }

    let repeat = 1;
    let temp = str1;

    while (temp.length < str2.length) {
        temp += str1;
        repeat++;
    }

    // kmp pattern search
    if (stringMatching(temp, str2) == 1) {
        return repeat;
    }

    // ans na milne par - temp + str1, then kmp search
    temp += str1;
    if (stringMatching(temp, str2) == 1) {
        return repeat + 1;
    }

    return -1;
}

let str1 = "abcd";
let str2 = "cdabcdab";
console.log(repeatedString(str1, str2)); // 3 // three time repeat kiya hai string ko jab jakar meri string match hui hai