// from love babbar 

function permute(strArr, index, ans) {
    if (index >= strArr.length) {
        ans.push(strArr.join(""))
        return;
    }


    for (let j = index; j < strArr.length; j++) {
        [strArr[j], strArr[index]] = [strArr[index], strArr[j]];
        permute(strArr, index + 1, ans);
        [strArr[j], strArr[index]] = [strArr[index], strArr[j]];
    }

}

// Example usage:
let str = "abc";
let arrStr = str.split("");
// console.log(arrStr); // ['a', 'b', 'c']
let ans = [];
permute(arrStr, 0, ans);
console.log(ans); // ['abc', 'acb', 'bac', 'bca', 'cba', 'cab']

