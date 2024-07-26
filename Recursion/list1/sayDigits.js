const arr = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]

function sayDigit(n, arr) {
    if (n == 0) return

    let digit = n % 10;
    n = Math.floor(n / 10);
    sayDigit(n, arr)
    console.log(arr[digit]); // four one two
}

sayDigit(412, arr)