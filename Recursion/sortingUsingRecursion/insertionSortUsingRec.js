function insertionSortUsingRec(arr, start = 1) {

    if (start >= arr.length) {
        return arr;
    }

    for (let i = start; i >= 0; i--) {
        if (arr[i] < arr[i - 1]) {
            let temp = arr[i];
            arr[i] = arr[i - 1];
            arr[i - 1] = temp;
        }
    }

    return insertionSortUsingRec(arr, start + 1)
}


let arr = [15, 20, 3, 9, 0];
console.log(insertionSortUsingRec(arr));


// -----------------------------------------------------------------------

// here we are passing the reference of array,
// jo bhi changes hoge array me vo hame yha direct iss array me mil jayenge
// return karne ki need nhi hai array ko

// function insertionSortUsingRec(arr, start = 1) {

//     if (start >= arr.length) {
//         return;
//     }

//     for (let i = start; i >= 0; i--) {
//         if (arr[i] < arr[i - 1]) {
//             let temp = arr[i];
//             arr[i] = arr[i - 1];
//             arr[i - 1] = temp;
//         }
//     }

//     insertionSortUsingRec(arr, start + 1)
// }


// let arr = [15, 20, 3, 9, 0];
// insertionSortUsingRec(arr);
// console.log(arr);