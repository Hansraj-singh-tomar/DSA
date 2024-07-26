function reverse(newStr, start, end) {
    let temp;
    while (start < end) {
        temp = newStr[start];
        newStr[start] = newStr[end];
        newStr[end] = temp;
        start++;
        end--;
    }

    return newStr.join("")
}

function rightRotate(newStr, k, s2) {
    reverse(newStr, 0, newStr.length - 1);
    reverse(newStr, 0, k - 1);
    return reverse(newStr, k, newStr.length - 1) == s2;
}

function leftRotate(newStr, k, s1) {
    let n = newStr.length - 1;
    reverse(newStr, 0, n); // nozama
    reverse(newStr, 0, n - k); // azonma
    return reverse(newStr, n - k + 1, n) == s1; // azonam == s1
}



let str = "amazon";
let s1 = "azonam"; // rotated by 2 places to the left
let s2 = "onamaz"; // rotated by 2 places to the right
let k = 2;
console.log(rightRotate(str.split(""), k, s2)); // true
console.log(leftRotate(str.split(""), k, s1)); // true

