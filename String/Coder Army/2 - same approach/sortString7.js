// using bubble sort 
// time complexity - O(n^2)
function sortStr(str) {
    console.log(str);

    let temp;
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j < str.length; j++) {
            if (str[j] < str[i]) {
                temp = str[j];
                str[j] = str[i];
                str[i] = temp;
            }
        }
    }

    return str.join("");
}

let str = "hello";
let newStr = str.split("");
console.log(sortStr(newStr)); // ehllo


// ------------------------------------------------------------------------------------

// using counting sort - from chat gpt and coder army and from counting sort 

function sortStr(str) {
    let count = new Array(26).fill(0);
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i) - 'a'.charCodeAt(0);
        count[charCode]++;
    }
    console.log(count); // [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    let sortedStr = '';

    for (let i = 0; i < 26; i++) {
        while (count[i] > 0) {
            sortedStr += String.fromCharCode(i + 'a'.charCodeAt(0));
            count[i]--;
        }
    }

    return sortedStr
}

console.log(sortStr("hello")); // ehllo


// console.log(String.fromCharCode(97)); // a
// console.log(String.fromCharCode(98)); // b
// console.log("hello".charAt(1)); // 'e'
// console.log("hello".charCodeAt(1)); // 101
// console.log("a".charCodeAt(0)); // 97

// another way to do that using repeat() method
// for (let i = 0; i < 26; i++) {
// console.log(String.fromCharCode(i + 'a'.charCodeAt(0))); // a b c d ..... z
// console.log(String.fromCharCode(i + 'a'.charCodeAt(0)).repeat(0)); // ' '
// console.log(String.fromCharCode(i + 'a'.charCodeAt(0)).repeat(2)); // aa bb cc .... zz

// sortedStr += String.fromCharCode(i + 'a'.charCodeAt(0)).repeat(count[i]);
// }
