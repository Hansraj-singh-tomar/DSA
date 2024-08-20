// TC - O(n/2) + O(n/2) + O(2n)

function reverseString(s) {
    return s.split('').reverse().join(''); // O(n)
}

function replaceParentheses(s) {
    let result = "";

    for (let ch of s) { // O(n)
        if (ch == '(') {
            result += ')'
        } else if (ch == ')') {
            result += '('
        } else {
            result += ch
        }
    }

    return result;
}

function infixToPostfix(s) {
    let i = 0;
    let ans = "";
    let stack = [];

    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3
    };

    function priority(operator) {
        return precedence[operator];
    }

    while (i < s.length) {
        if (s[i] >= "A" && s[i] <= "Z" || s[i] >= "a" && s[i] <= "z" || s[i] >= "0" && s[i] <= "9") {
            ans += s[i];
        } else if (s[i] == '(') {
            stack.push(s[i]);
        } else if (s[i] == ')') {
            while (stack.length !== 0 && stack[stack.length - 1] !== '(') {
                ans += stack.pop();
            }
            stack.pop(); // to remove "(" from the stack
        } else {
            while (stack.length !== 0 && priority(s[i]) < priority(stack[stack.length - 1])) {
                if (s[i] === '^' && stack[stack.length - 1] === '^') break; // handle right-associativity
                ans += stack.pop();
            }
            stack.push(s[i]);
        }
        i++;
    }

    while (stack.length !== 0) {
        ans += stack.pop();
    }

    return ans;
}

function infixToPrefix(s) {
    // step - 1: Reverse the infix expression
    let reversedInfix = reverseString(s);

    // Step 2: Replace '(' with ')' and ')' with '('
    let modifiedInfix = replaceParentheses(reversedInfix);

    // Step 3: Get the postfix of the modified infix expression
    let postfix = infixToPostfix(modifiedInfix);

    // Step 4: Reverse the postfix expression to get prefix
    let prefix = reverseString(postfix);

    return prefix;
}

let s = "(A+B)*C-D+F";
// let s = "a*b+(c^d-e)";
console.log(infixToPrefix(s)); // +-*+ABCDF
