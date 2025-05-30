function isPalindrom(str, i, n) {
    if (i >= n / 2) return true;
    if (str[i] !== str[n - i - 1]) return false;

    return isPalindrom(str, i + 1, n);
}

let str = "madam";
let i = 0;
let n = str.length;
console.log(isPalindrom(str, i, n)); // true