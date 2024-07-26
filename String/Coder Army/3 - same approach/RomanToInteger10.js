function num(ch) {
    if (ch == 'I') {
        return 1;
    } else if (ch == 'V') {
        return 5;
    } else if (ch == 'X') {
        return 10;
    } else if (ch == 'L') {
        return 50;
    } else if (ch == 'C') {
        return 100;
    } else if (ch == 'D') {
        return 500;
    } else if (ch == 'M') {
        return 1000;
    }
}

function romanToInt(str) {
    let sum = 0;
    let index = 0;

    while (index < str.length - 1) {
        if (num(str[index]) < num(str[index + 1])) {
            sum -= num(str[index])
        } else {
            sum += num(str[index])
        }
        index++;
    }
    sum += num(str[str.length - 1]);
    return sum;
}

// XIX => 10 - 1 + 10;

console.log(romanToInt("XIX"));  // 19