// 1. first approach - from love babbar
// if power of a^b then,
// 1. b is even -> a^1/2 * a^1/2
// 2. b is odd -> a * a^1/2 * a^1/2 
// exp :- 2^9 => 2 * (2^4 * 2^4) => 2 * (2^4)^2 => 2 * (2^2 * 2^2)^2 =>  ans so on ... 

function powerOfN(a, power) {
    if (power === 0) {
        return 1
    }

    if (power == 1) {
        return a;
    }

    // recrusive call
    let ans = powerOfN(a, Math.floor(power / 2))

    // if power is even
    if (power % 2 == 0) {
        return ans * ans;
    } else {
        // if power is odd
        return a * ans * ans;
    }
}

console.log(powerOfN(2, 10));


// 2. second approach
// function powerOfN(n) {
//     if (n == 0) {
//         return 1
//     }

//     return 2 * powerOfN(n - 1)
// }

// console.log(powerOfN(5));