// Time complexity is O(n)
function intToRoman() {
    const M = ["", "M", "MM", "MMM"];
    const C = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    const X = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    const I = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

    return M[Math.floor(num / 1000)] +
        C[Math.floor((num % 1000) / 100)] +
        X[Math.floor((num % 100) / 10)] +
        I[num % 10];
}

let num = 1994;
console.log(intToRoman(num)); // MCMXCIV

// -------------------------------------------------------------------------------


// Time Complexity - O(n^2)
function intToRoman(num) {
    const val = [
        [1000, 'M'],
        [900, 'CM'],
        [500, 'D'],
        [400, 'CD'],
        [100, 'C'],
        [90, 'XC'],
        [50, 'L'],
        [40, 'XL'],
        [10, 'X'],
        [9, 'IX'],
        [5, 'V'],
        [4, 'IV'],
        [1, 'I'],
    ];

    let romanNumber = "";

    for (let i = 0; i < val.length; i++) {
        const [value, symbol] = val[i];

        while (num >= value) {
            romanNumber += symbol;
            num -= value;
        }
    }

    return romanNumber;
}

console.log(intToRoman(1994)); // MCMXCIV
