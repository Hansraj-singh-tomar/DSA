// longest palindrom
// levelA => leAel or level (we can choose either leAel or level) => total length is 5 that's our answer
// Time Complexity - O(n)
// Space Complexity - O(n)
function check(str) {
    let strObj = {};
    let count = 0;
    let odd = 0;
    for (let elm of str) {
        if (strObj[elm]) {
            strObj[elm]++;
        } else {
            strObj[elm] = 1;
        }
    }

    for (let elm in strObj) {
        if (strObj[elm] % 2 == 0) {
            count += strObj[elm];
        } else {
            count += strObj[elm] - 1;
            odd = 1;
        }
    }

    console.log(strObj);
    return count + odd;
}

let str = "levelA"
console.log(check(str)); // 5 // level

// 'A' === 'a' => false 