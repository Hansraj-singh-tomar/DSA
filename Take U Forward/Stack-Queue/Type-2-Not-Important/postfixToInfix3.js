// postFix to inFix

function postfixToInfix(s) {
    let i = 0;
    let stack = [];

    while (i < s.length) {
        if ((s[i] >= 'A' && s[i] <= 'Z') || (s[i] >= 'a' && s[i] <= 'z') || (s[i] >= '0' && s[i] <= '9')) {
            stack.push(s[i])
        } else {
            let top1 = stack.pop();
            let top2 = stack.pop();

            let str = '(' + top2 + s[i] + top1 + ')';

            stack.push(str);
        }
        i++;
    }

    return stack[stack.length - 1];
}

let s = "AB-DE+F*/";
console.log(postfixToInfix(s)); // ((A-B)/((D+E)*F))
