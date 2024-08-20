// postfix to preFix

function PostfixToPrefix(s) {
    let i = 0;
    let stack = [];

    while (i < s.length) {
        if ((s[i] >= 'A' && s[i] <= 'Z') || (s[i] >= 'a' && s[i] <= 'z') || (s[i] >= '0' && s[i] <= '9')) {
            stack.push(s[i])
        } else {
            let top1 = stack.pop();
            let top2 = stack.pop();

            let str = s[i] + top2 + top1;

            stack.push(str);
        }
        i++;
    }

    return stack[stack.length - 1];
}

let s = "AP-DE+F*/";
console.log(PostfixToPrefix(s));  // /-AP*+DEF