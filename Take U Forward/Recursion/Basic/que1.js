// Q. print name, n = 5 times using recursion
// function printname(n, i) {
//     if (i >= n) return;
//     console.log("Utkarsh");
//     printname(n, i + 1);
// }
// let n = 5;
// let i = 0;
// printname(n, i); // Utkarsh Utkarsh Utkarsh Utkarsh Utkarsh


// Q. Print linearlly from 1 to n using recursion
// same the above code just replace console.log("Utkarsh") with console.log(i + 1)

// Q. Print number N to 1 using recursion
// function printname(n, i) {
//     if (i <= 0) return;
//     console.log(i);
//     printname(n, i - 1);
// }
// printname(5, 5); // 5 4 3 2 1

// Q. Print from 1 to N using recursion and backtracking (we don't have to use fun(i+1))
// function printNum(n, i) {
//     if (i < 1) return;
//     printNum(n, i - 1);
//     console.log(i);
// }

// console.log(printNum(5, 5)); // 1 2 3 4 5