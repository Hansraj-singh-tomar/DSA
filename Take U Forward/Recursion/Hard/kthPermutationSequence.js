// Brute Force Approach
// Time Complexity: O(n!)
function kthPermutationSequence(n, k) {
    let result = [];
    let used = Array(n + 1).fill(false);

    function backTrack(path) {
        if (path.length == n) {
            result.push(path.join(''));
            return;
        }

        for (let i = 1; i <= n; i++) {
            if (!used[i]) {
                used[i] = true;
                path.push(i);
                backTrack(path);
                path.pop();
                used[i] = false;
            }
        }
    }

    backTrack([]);

    result.sort();

    return result[k - 1];
}

console.log(kthPermutationSequence(3, 4)); // 231

// ----------------------------------------Optimal solution -------------------------------------------------

function getPermutation(n, k) {
    let numbers = [];
    let factorial = 1;
    for (let i = 1; i < n; i++) {
        factorial *= i;
        numbers.push(i);
    }
    numbers.push(n);
    k--; // Convert to 0-based index
    let result = '';
    while (numbers.length) {
        let index = Math.floor(k / factorial);
        result += numbers[index];
        numbers.splice(index, 1); // Remove the used number
        k %= factorial; // Update k for the next iteration
        if (numbers.length > 0) {
            factorial /= numbers.length; // Update factorial for the next number
        }
    }
    return result;
}

console.log(getPermutation(3, 4)); // 231