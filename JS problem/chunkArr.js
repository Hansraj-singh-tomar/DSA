function chunk(arr, k) {
    let result = [];

    let subArr = [];
    for (let i = 0; i < arr.length; i++) {
        subArr.push(arr[i]);
        if (subArr.length === k) {

            result.push([...subArr]);
            // subArr = [];

            // instead of creating array again and again, we can use or utilize the same array, subArr.length=0;
            subArr.length = 0;
        }

    }

    if (subArr.length > 0) {
        result.push(subArr);
    }

    return result;
}

let arr = [1, 2, 3, 4, 5, 6];
let k = 2;
console.log(chunk(arr, 2)); // [[1,2], [3,4], [5,6]]


// ------------------------------------------------------------

// optimal approach
function chunk(arr, k) {
    let result = [];

    for (let i = 0; i < arr.length; i += k) {
        result.push(arr.slice(i, i + k));
    }

    return result;
}

let arr = [1, 2, 3, 4, 5, 6];
let k = 2;
console.log(chunk(arr, k)); // [[1, 2], [3, 4], [5, 6]]
