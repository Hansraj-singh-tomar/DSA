// prefix to postFix

function PrefixToPostfix(s) {
    let i = s.length - 1;
    let stack = [];

    while (i >= 0) {
        if ((s[i] >= 'A' && s[i] <= 'Z') || (s[i] >= 'a' && s[i] <= 'z') || (s[i] >= '0' && s[i] <= '9')) {
            stack.push(s[i])
        } else {
            let top1 = stack.pop();
            let top2 = stack.pop();

            let str = top1 + top2 + s[i];

            stack.push(str);
        }
        i--;
    }

    return stack[stack.length - 1];
}

let s = "/-AB*+DEF";
console.log(PrefixToPostfix(s));  // AB-DE+F*/