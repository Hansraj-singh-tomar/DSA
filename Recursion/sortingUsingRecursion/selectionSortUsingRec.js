function selectionSortUsingRec(arr, start = 0) {
    if (start >= arr.length - 1) {
        return arr;
    }

    let minValId = start;

    for (let i = start + 1; i < arr.length; i++) {
        if (arr[i] < arr[minValId]) {
            minValId = i;
        }
    }

    let temp = arr[minValId];
    arr[minValId] = arr[start];
    arr[start] = temp;

    return selectionSortUsingRec(arr, start + 1);
}


let arr = [23, 1, 43, 54];
console.log(selectionSortUsingRec(arr));


// -------------------------------------------------------------------
// here we are passing the reference of array,
// jo bhi changes hoge array me vo hame yha direct iss array me mil jayenge
// return karne ki need nhi hai array ko


// function selectionSortUsingRec(arr, start = 0) {
//     if (start >= arr.length - 1) {
//         return;
//     }

//     let minValId = start;

//     for (let i = start + 1; i < arr.length; i++) {
//         if (arr[i] < arr[minValId]) {
//             minValId = i;
//         }
//     }

//     let temp = arr[minValId];
//     arr[minValId] = arr[start];
//     arr[start] = temp;

//     selectionSortUsingRec(arr, start + 1);
// }


// let arr = [23, 1, 2, 100, 43, 54];
// // here we are passing the reference of array,
// // jo bhi changes hoge array me vo hame yha direct iss array me mil jayenge
// // return karne ki need nhi hai array ko
// selectionSortUsingRec(arr);
// console.log(arr);