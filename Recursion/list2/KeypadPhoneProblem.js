// Q. Letter combinstioin of phone number - from love babbar and chat gpt

function phoneKeypadProblem(digit, mappedArr, output, index, ans) {
    if (index >= digit.length) {
        ans.push([...output].join("")); // ['a', 'd'].join("") => 'ad'
        return;
    }

    let number = digit[index]; // 2
    let value = mappedArr[number]; // abc

    // In that we are not using enclude or exclude concept

    for (let i = 0; i < value.length; i++) {
        output.push(value[i]);
        phoneKeypadProblem(digit, mappedArr, output, index + 1, ans);
        output.pop();
    }
}

let digit = "23";
let mappedArr = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
let output = [];
let ans = [];
phoneKeypadProblem(digit, mappedArr, output, 0, ans);
console.log(ans); //  ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']


// console.log(typeof digit[1]); // 3 // string
// console.log(typeof mappedArr[digit[1]]); // def // string

