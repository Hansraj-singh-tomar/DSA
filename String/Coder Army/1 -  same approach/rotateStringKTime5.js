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

function rotate(newStr, k) {
    reverse(newStr, 0, newStr.length - 1);
    reverse(newStr, 0, k - 1);
    return reverse(newStr, k, newStr.length - 1);
}

let str = "amazon";
let newStr = str.split("");
let k = 2;
console.log(rotate(newStr, k));