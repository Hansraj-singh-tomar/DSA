// sort only vowel in a string in string upparcase/lowercase can be have both
// s = "leetcode" => leetcedo => a,e,i,o,u
// s = "lEetcOde" => lEOtcede => EeOe => EOee
// s = "Rebal" => "Rabel"

// Step =>
// 1. select the vowel
// 2. sort the vowel
// 3. insert the vowel at their right position

// Time and Complexity = O(n)

function sortVowelInStr(str) {

    let countLower = new Array(26).fill(0);
    let countUpper = new Array(26).fill(0);

    for (let i = 0; i < str.length; i++) {
        if (str[i] == 'a' || str[i] == 'e' || str[i] == 'i' || str[i] == 'o' || str[i] == 'u') {
            let charCode = str[i].charCodeAt(0) - 'a'.charCodeAt(0);
            countLower[charCode]++;
            str[i] = '#'
        }

        if (str[i] == 'A' || str[i] == 'E' || str[i] == 'I' || str[i] == 'O' || str[i] == 'U') {
            let charCode = str[i].charCodeAt(0) - 'A'.charCodeAt(0);
            countUpper[charCode]++;
            str[i] = '#'
        }
    }

    // console.log(countLower); // [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // console.log(countUpper); // [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // console.log(str); // ['l', '#', '#', 't', 'c', '#', 'd', '#']

    let vowelStr = ''

    for (let i = 0; i < 26; i++) { // O(1)
        while (countUpper[i] > 0) { // O(n)
            vowelStr += String.fromCharCode(i + 'A'.charCodeAt(0));
            countUpper[i]--
        }
    }

    for (let i = 0; i < 26; i++) {
        while (countLower[i] > 0) {
            vowelStr += String.fromCharCode(i + 'a'.charCodeAt(0))
            countLower[i]--;
        }
    }

    // console.log(vowelStr); // EOee

    let first = 0;
    let second = 0;

    while (second < vowelStr.length) {
        // if (str[first] == 'A' || str[first] == 'E' || str[first] == 'I' || str[first] == 'O' || str[first] == 'U' || str[first] == 'a' || str[first] == 'e' || str[first] == 'i' || str[first] == 'o' || str[first] == 'u') {
        if (str[first] == '#') {
            str[first] = vowelStr[second];
            second++;
        }
        first++
    }

    return str.join("");
}

let str = "lEetcOde";
let newStr = str.split("");
console.log(sortVowelInStr(newStr)); // lEOtcede

