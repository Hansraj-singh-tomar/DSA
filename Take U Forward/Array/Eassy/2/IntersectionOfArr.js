// Intersection of two array

// Brute force approach
// TC - O(n^2)
// SC - O(n^2)

function IntersectionOfSortedArr(arr1, arr2) {

    let intersection = [];
    let visited = new Array(arr2.length).fill(0);

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] == arr2[j] && visited[j] == 0) {
                intersection.push(arr1[i]);
                visited[j] = 1;
                break;
            }
            if (arr2[j] > arr1[i]) break;
        }
    }

    return intersection;
}

let arr1 = [1, 2, 2, 3, 3, 4, 5, 6];
let arr2 = [2, 3, 3, 5, 6, 6, 7];
console.log(IntersectionOfSortedArr(arr1, arr2)); // [2,3,3,5,6]

// --------------------------------------------------------------------

// Optimal approach - using two pointers
// TC - O(n1 + n2)
// SC - O(1)

function unionOfSortedArr(arr1, arr2) {
    let i = 0;
    let j = 0;
    let intersection = [];

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            i++;
        } else if (arr1[i] > arr2[j]) {
            j++;
        } else if (arr1[i] == arr2[j]) {
            intersection.push(arr1[i])
            i++;
            j++;
        }
    }

    return intersection;
}

let arr3 = [1, 2, 2, 3, 3, 4, 5, 6];
let arr4 = [2, 3, 3, 5, 6, 6, 7];
console.log(unionOfSortedArr(arr3, arr4)); // [2,3,3,5,6]