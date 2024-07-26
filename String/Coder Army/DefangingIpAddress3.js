// DEfanging an IP address
// Time and Space complexity => O(n)

function DefangingIpAddress(str) {
    let ans = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ".") {
            ans += "[.]"
        } else {
            ans += str[i]
        }
    }

    return ans;
}

console.log(DefangingIpAddress("127.3.3.1")); // "127[.]3[.]3[.]1"