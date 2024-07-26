// Minimum characters to be added at front to make string palindrome


// 1. reverse of string
// 2. add $ in string => s += '$'
// exp - "aaaa" is type ki string ke liye ham dollar sign use kar rhe hai
// 3. string me reverse string ko add kar do => s += revStr
// 4. lps of that string lps(s)
// 4. str.length - lps of last element

function makePalindrom(str) {
    let ans = '';
    let strLength = str.length;
    let revStr = str.split("").reverse().join("");
    str += '$';
    console.log(revStr); // PSROOR
    console.log(str); // ROORSP$

    str += revStr;

    console.log(str); // ROORSP$PSROOR

    let first = 0;
    let second = 1;
    let lps = new Array(str.length).fill(0);

    while (second < str.length) {
        if (str[first] == str[second]) {
            lps[second] = first + 1;
            first++;
            second++;
        } else {
            if (first == 0) {
                lps[second] = 0;
                second++;
            } else {
                first = lps[first - 1];
            }
        }
    }

    // console.log(lps); //  [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 2, 3, 4]

    return strLength - lps[lps.length - 1]
}


let str = "ROORSP";
let chCount = makePalindrom(str); // 2 // last ke two character add karne par hamari string palindrom me convert ho jayegi
console.log(str.slice(-chCount).split("").reverse().join("")); // PS
console.log(str.slice(-chCount).split("").reverse().join("") + str); // PSROORSP

// console.log(makePalindrom(str)); // 2 // ps