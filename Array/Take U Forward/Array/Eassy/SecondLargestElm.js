// Brute force approach
// TC - nlog(n) = O(n)
function secondLargest(arr) {
    let newArr = arr.sort((a, b) => a - b);
    let largestElm = newArr[newArr.length - 1];
    let secondLargest = -1;
    for (let i = newArr.length - 2; i >= 0; i--) {
        if (newArr[i] !== largestElm) {
            secondLargest = newArr[i];
            break;
        }
    }
    return secondLargest;
}

let arr = [1, 2, 4, 7, 7, 5];
console.log(secondLargest(arr)); // 5

// ----------------------------------------------------------------------------

// Better approach
// TC - O(n) + O(n)

function secondLargest(arr) {
    let largestElm = arr[0];
    let secondLargest = -1;

    // we are finding largest element
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > largestElm) {
            largestElm = arr[i]
        }
    }

    // finding second largest elm 
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > secondLargest && arr[i] < largestElm) {
            secondLargest = arr[i];
        }
    }

    // second approach to find second element in that context
    // for (let j = 0; j < n - 1; j++) {
    //     if (arr[j] !== largestElm) {
    //         secondLargest = Math.max(secondLargest, arr[j])
    //     }
    // }

    return secondLargest;
}

let arr2 = [1, 2, 4, 7, 7, 5];
console.log(secondLargest(arr2)); // 5

// ------------------------------------------------------------------------------------

// optimal approach

function secondLargest(arr) {
    let largestElm = arr[0];
    let secondLargest = -1;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > largestElm) {
            secondLargest = largestElm;
            largestElm = arr[i];
        } else if (arr[i] < largestElm && arr[i] > secondLargest) {
            secondLargest = arr[i];
        }
    }

    return secondLargest;
}

let arr3 = [1, 2, 4, 7, 7, 5];
console.log(secondLargest(arr3)); // 5