// Using memoization

// TC - O(n)
// SC - O(n) + O(n)

// Series = [0, 1, 1, 2, 3, 5, 8]

let n = 4;
let dp = Array(n + 1).fill(-1);

console.log("dp", dp);

function fib(n) {
    if (n <= 1) {
        return n;
    }
    if (dp[n] !== -1) return dp[n];

    return dp[n] = fib(n - 1) + fib(n - 2)
}

console.log(fib(4)) // 3

// ---------------------Using Tabulation----------------------------------------

// TC - O(n)
// SC - O(1)

function fib2(n) {
    let prev = 1;
    let prev2 = 0;

    for (let i = 2; i <= n; i++) {
        curi = prev + prev2;
        prev2 = prev;
        prev = curi;
    }

    return prev;
}

console.log(fib2(4)); // 3