function removeAllAdjacentDuplicatesII(str, k) {
    let st = [];

    for (let char of str) {
        if (st.length > 0 && st[st.length - 1][1] == k) {
            st.pop();
        }

        if (st.length > 0 && st[st.length - 1][0] == char) {
            st[st.length - 1][1]++;
        } else {
            st.push([char, 1]);
        }
    }


    let res = "";
    for (let [char, count] of st) {
        res += char.repeat(count);
    }

    return res;
}

console.log(removeAllAdjacentDuplicatesII("deeedbbcccbdaa", 3));
