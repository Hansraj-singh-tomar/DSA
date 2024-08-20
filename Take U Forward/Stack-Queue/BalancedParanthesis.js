// from sriver - TUF
// Balanced Paranthesis
// s = ()[{}()] // true
// s = ([{}(]) // false // must follow the order

function validParanthesis(str) {
    let stack = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] == "(" || str[i] == "[" || str[i] == "{") {
            stack.push(str[i]);
        } else {

            if (stack.length === 0) {
                return false;
            }

            let ch = stack[stack.length - 1]
            stack.pop();

            if (str[i] == ')' && ch == '(' || str[i] == '}' && ch == '{' || str[i] == ']' && ch == '[') {

            } else {
                return false;
            }
        }
    }

    return stack.length == 0; // means that everything is matched
}

console.log(validParanthesis('()[{}()]')); // true
console.log(validParanthesis('([{}(])')); // false


// ----------------------------------------------------------------------------------------------------------------

// From Chat GPT

class ParenthesisChecker {
    constructor() {
        this.stack = [];
        this.matchingParenthesis = {
            ')': '(',
            ']': '[',
            '}': '{'
        };
    }

    isBalanced(s) {
        for (let char of s) {
            if (char === '(' || char === '[' || char === '{') {
                this.stack.push(char);
            } else if (char === ')' || char === ']' || char === '}') {
                if (this.stack.length === 0 || this.stack.pop() !== this.matchingParenthesis[char]) {
                    return false;
                }
            }
        }

        return this.stack.length === 0;
    }
}

// Example usage:
const checker = new ParenthesisChecker();
console.log(checker.isBalanced("()"));       // true
console.log(checker.isBalanced("([{}])"));   // true
console.log(checker.isBalanced("({[)]}"));   // false
console.log(checker.isBalanced("((()"));     // false


// -------------------------------------------------------------------------------------------------------------

// From chat gpt
function isBalanced(s) {
    const stack = [];
    const matchingParenthesis = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    for (let char of s) {
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
        } else if (char === ')' || char === ']' || char === '}') {
            if (stack.length === 0 || stack.pop() !== matchingParenthesis[char]) {
                return false;
            }
        }
    }

    // If the stack is empty, all parentheses were matched
    return stack.length === 0;
}

// Example usage:
console.log(isBalanced("()"));       // true
console.log(isBalanced("([{}])"));   // true
console.log(isBalanced("({[)]}"));   // false
console.log(isBalanced("((()"));     // false
