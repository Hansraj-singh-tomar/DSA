// reverse array using an recursion

let arr = [1, 2, 3, 4, 5];
function reverseArr(l, r) {
    if (l >= r) return;

    [arr[l], arr[r]] = [arr[r], arr[l]];
    reverseArr(l + 1, r - 1);
}

reverseArr(0, arr.length - 1);
console.log(arr); // [5,4,3,2,1]

// ---------------------------------------------------

// Do it using single variable instead of l and r use only sinle variable
// reverse array using an recursion

function reverseArr(arr2, i, n) {
    if (i > n / 2) return;

    [arr2[i], arr2[n - i - 1]] = [arr2[n - i - 1], arr2[i]];
    reverseArr(arr2, i + 1, n);
}

let arr2 = [1, 2, 3, 4, 5];
let i = 0;
let n = arr2.length;
reverseArr(arr2, i, n);
console.log(arr2);