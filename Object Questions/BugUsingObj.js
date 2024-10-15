let map = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
}

let level = 0;

if (map[level]) {
    console.log("console - 1", map[level]);
}

if (level in map) {
    console.log("console - 2", map[level]);
}