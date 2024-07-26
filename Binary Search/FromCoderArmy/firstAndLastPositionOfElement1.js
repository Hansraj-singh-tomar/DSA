// first ans last position of an element in sorted Array

// input = [5,7,7,8,8,10]
// elm = 8;
// output => first position - 3, last position - 4
// time complexity is O(n)

// function findElement(arr, target) {
//     function findFirst(arr, target) {
//         let start = 0;
//         let end = arr.length - 1;
//         let firstIndex = -1;

//         while (start <= end) {
//             let mid = Math.floor((start + end) / 2);
//             if (target == arr[mid]) {
//                 firstIndex = mid;
//                 end = mid - 1;
//             } else if (target > arr[mid]) {
//                 start = mid + 1;
//             } else if (target < arr[mid]) {
//                 end = mid - 1;
//             }
//         }

//         return firstIndex;
//     }

//     function findLast(arr, target) {
//         let start = 0;
//         let end = arr.length - 1;
//         let lastIndex = -1;

//         while (start <= end) {
//             let mid = Math.floor((start + end) / 2);
//             // let mid = start + (end - start) / 2;
//             if (target == arr[mid]) {
//                 lastIndex = mid;
//                 start = mid + 1;
//             } else if (target > arr[mid]) {
//                 start = mid + 1;
//             } else if (target < arr[mid]) {
//                 end = mid - 1;
//             }
//         }

//         return lastIndex
//     }

//     const firstPosition = findFirst(arr, target);
//     const lastPosition = findLast(arr, target);

//     return [firstPosition, lastPosition];
// }

// let arr = [5, 7, 7, 8, 8, 10];
// console.log(findElement(arr, 8)); // [3,4]


// Another way to do it.
function findElement(arr, target) {
    let start = 0;
    let end = arr.length - 1;
    let firstPosition = -1;
    let lastPosition = -1;

    // for the first position
    while (start <= end) {
        let mid = Math.floor(start + (end - start) / 2)

        if (arr[mid] == target) {
            firstPosition = mid;
            end = mid - 1;
        } else if (target > arr[mid]) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    start = 0;
    end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor(start + (end - start) / 2);

        if (arr[mid] == target) {
            lastPosition = mid;
            start = mid + 1;
        } else if (target > arr[mid]) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    return [firstPosition, lastPosition];
}


let arr = [5, 7, 7, 8, 8, 10];
console.log(findElement(arr, 8)); // [3,4]





