function addString(str1, str2) {
    let index1 = str1.length - 1;
    let index2 = str2.length - 1;
    // console.log(str2[index2]); // 6

    let sum;
    let carry = 0;
    let ans = '';

    while (index2 >= 0) {
        sum = (str1[index1] - '0') + (str2[index2] - '0') + carry; // ('5' - '0') + ('3'+'0') + 2 = 10
        carry = Math.floor(sum / 10);
        ans += sum % 10;
        index1--;
        index2--;
    }

    while (index1 >= 0) {
        sum = (str1[index1] - '0') + carry;
        carry = Math.floor(sum / 10);
        ans += sum % 10;
        index1--;
    }

    if (carry) {
        ans += carry;
    }

    // console.log(typeof ans); // string
    return ans.split("").reverse().join("");
}

let str1 = "99845";
let str2 = "938";

if (str1.length < str2.length) {
    console.log(addString(str2, str1)); // 100783
} else {
    console.log(addString(str1, str2)); // 100783
}
