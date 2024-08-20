// Detailed explaination in note book
// TC - O(n) + O(n)
// SC - O(n) + O(n)

function infixToPostfix(s) {
    let stack = [];
    let ans = "";
    let i = 0;

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
        if ((s[i] >= 'A' && s[i] <= 'Z') || (s[i] >= 'a' && s[i] <= 'z') || (s[i] >= '0' && s[i] <= '9')) {
            ans = ans + s[i]
        } else if (s[i] == '(') {
            stack.push(s[i])
        } else if (s[i] == ')') {
            while (stack.length !== 0 && stack[stack.length - 1] !== '(') {
                ans += stack.pop();
            }
            stack.pop(); // remove '('
        } else {
            // infix to prefix me equal sign ko hta dena hai priority(s[i]) < priority(stack[stack.length - 1])
            while (stack.length !== 0 && priority(s[i]) <= priority(stack[stack.length - 1])) {
                if (s[i] === '^' && stack[stack.length - 1] === '^') break; // handle right-associativity
                ans += stack.pop(); // top element ko return karke stack se remove bhi kar dega
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


let s = "a*b+(c^d-e)"
console.log(infixToPostfix(s)); // abcd^e-*+
