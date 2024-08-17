// Rearrange array element by sign | 2 Varieties of the same problem

// Brute force approach - This approach is usefull for both non N/2 elemnent and for N/2 element
// TC - O(n) + O(n)
// SC - O(n)

function rearrangeElm(arr) {
    let posElm = [];
    let negElm = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            negElm.push(arr[i])
        } else {
            posElm.push(arr[i])
        }
    }

    for (let i = 0; i < posElm.length; i++) {
        arr[i * 2] = posElm[i];
        arr[i * 2 + 1] = negElm[i]
    }

    return arr;
}

let arr = [3, 1, -2, -5, 2, -4]; // N/2 element  //  [3, -2, 1, -5, 2, -4]
// let arr = [3, -9, 1, -2, -5, 2, -4]; // non N/2 element // [3, -9, 1, -2, 2, -5, -4]
console.log(rearrangeElm(arr));

// -----------------------------------------------------------------------

// optimal opproach - This approach is not useful for non N/2 elements
// TC - O(n);
// SC - O(n);

function rearrangeElm(arr) {
    let ans = new Array(arr.length);
    let posIdx = 0;
    let negIdx = 1;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            ans[negIdx] = arr[i];
            negIdx += 2;
        } else {
            ans[posIdx] = arr[i]
            posIdx += 2;
        }
    }

    return ans;
}

let arr1 = [3, 1, -2, -5, 2, -4];
console.log(rearrangeElm(arr1)); // [3, -2, 1, -5, 2, -4]

// -------------------------------------------------------------------

// Variety - 2
// Note - It has one solution using brute force

// pos.length !== neg.length
// 1. pos.length > neg.length 
// 2. neg.length > pos.length

function rearrangeElm(arr) {
    let pos = [];
    let neg = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            neg.push(arr[i]);
        } else {
            pos.push(arr[i]);
        }
    }

    if (pos.length > neg.length) {
        for (let i = 0; i < neg.length; i++) {
            arr[i * 2] = pos[i];
            arr[i * 2 + 1] = neg[i];
        }

        let start = neg.length * 2;
        for (let i = start; i < pos.length; i++) {
            arr[start] = pos[i];
            start++;
        }
    } else {
        for (let i = 0; i < pos.length; i++) {
            arr[i * 2] = pos[i];
            arr[i * 2 + 1] = neg[i];
        }

        let start = pos.length * 2;
        for (let i = start; i < neg.length; i++) {
            arr[start] = neg[i];
            start++;
        }
    }

    return arr;
}

let arr2 = [1, 2, -4, -5, 3, 6];
console.log(rearrangeElm(arr2)); // [1, -4, 2, -5, 3, 6]