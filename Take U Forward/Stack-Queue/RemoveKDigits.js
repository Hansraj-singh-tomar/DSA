// Remove K Digits
// num = "1432219", k = 3, ans = "1219"
// from this i can remove only 3 digits
// then i have to return the smaller string
// Edge cases -
// k <= n
// if(k==n) return "0"
// "00100" this is invalid string
// "100" this is valid string 
// num = "123456" and k = 3, if k is still 3 then we have to remove last 3 digits
function removeKDigits(str, k) {
    let st = [];
    for (let i = 0; i < str.length; i++) {
        while (st.length !== 0 && k > 0 && st[st.length - 1] > str[i]) {
            st.pop();
            k = k - 1;
        }
        // Only push non-zero digits or if the stack isn't empty (to avoid leading zeros)
        if (st.length > 0 || str[i] !== '0') {
            st.push(str[i]);
        }
    }

    // If k is still greater than 0, remove the last k digits from the end
    while (k > 0) {
        st.pop()
        k--;
    }

    // If the stack is empty, return "0"
    return st.length === 0 ? "0" : st.join("");
}

let str = "1432219"; // "1219"
// let str = "00100"; // "0"
// let str = "123456"; // "123" // while(k > 0) st.pop(), k--;
let k = 3;
console.log(removeKDigits(str, k)); // 1219

