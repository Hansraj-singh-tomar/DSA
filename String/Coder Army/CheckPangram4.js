// esi string jisme sare character ho alphabate ke a....z
function checkIsPangram(sentence) {
    let uniqueLetters = new Set();

    for (let ch of sentence) {
        if (ch >= 'a' && ch <= 'z') {
            uniqueLetters.add(ch);
        }
    }

    return uniqueLetters.size === 26;
}

let sentence1 = "The quick brown fox jumps over the lazy dog";
let sentence2 = "Hello, world!";
console.log(checkIsPangram(sentence1.toLowerCase())); // true
console.log(checkIsPangram(sentence2.toLowerCase())); // false