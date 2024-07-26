function printNum(n) {
    if (n == 0) return
    printNum(n - 1);
    console.log(n);
}

printNum(5); // 1,2,3,4,5