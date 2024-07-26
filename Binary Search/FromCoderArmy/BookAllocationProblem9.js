
// logic - max[min]

// from coder army

// function BookAllcationProblem(arr, totalBooks, totalStudents) {
//     let start = 0;
//     let end = 0;
//     let ans = -1;

//     for (let i = 0; i < arr.length - 1; i++) {
//         end += arr[i];
//     }


//     while (start <= end) {
//         let mid = Math.floor(start + (end - start) / 2);

//         let sum = 0;
//         let studentCount = 1;

//         for (let i = 0; i < totalBooks; i++) {
//             sum += arr[i];

//             if (sum > mid) {
//                 studentCount++;
//                 sum = 0;
//                 sum = arr[i];
//             }
//         }

//         if (studentCount <= totalStudents) {
//             ans = mid;
//             end = mid - 1;
//         } else {
//             start = mid + 1;
//         }
//     }

//     return ans;
// }

// let arr = [12, 34, 67, 90];
// let totalStudents = 2; // m
// let totalBooks = arr.length; // n
// console.log(BookAllcationProblem(arr, totalBooks, totalStudents)); // 113




// from love babbar
function isPossible(arr, totalBooks, totalStudents, mid) {
    let studentCount = 1;
    let sum = 0;

    if (totalStudents > totalBooks) return -1;

    for (let i = 0; i < totalBooks; i++) {
        if (sum + arr[i] <= mid) {
            sum += arr[i];
        } else {
            studentCount++;
            if (studentCount > totalStudents || arr[i] > mid) {
                return false;
            }
            sum = 0;
            sum += arr[i]
        }
    }
    return true;
}

function BookAllcationProblem(arr, totalBooks, totalStudents) {
    let start = 0;
    let end = 0;
    let ans = -1;

    for (let i = 0; i < arr.length - 1; i++) {
        end += arr[i];
    }

    let mid = Math.floor(start + (end - start) / 2);

    while (start <= end) {
        if (isPossible(arr, totalBooks, totalStudents, mid)) {
            ans = mid;
            end = mid - 1;
        } else {
            start = mid + 1;
        }
        mid = Math.floor(start + (end - start) / 2);
    }

    return Math.trunc(ans);
}

let arr = [25, 46, 28, 49, 24];
let totalStudents = 2; // m
let totalBooks = arr.length; // n
console.log(BookAllcationProblem(arr, totalBooks, totalStudents)); // 99


