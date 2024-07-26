// total SubArray with k different integer
// arr = [1,2,1,2,3]
// k = 2
// subArr = [1,2,1], countOfDifferentInteger = 2 => [1,2]
// subArr = [1,2], [2,1,2], [2,3], [1,2], [2,1] ... so on
// invalid subArr = [1,2,3] = 3 => [1,2,3] isme three different integer hai
// invalid subArr = [2] = 1 => isme ek hi hai hame 2 chahiye

function GoodSubArr(arr, k) {
    let goodSubArrCount = 0;
    let start = 0;
    let end = 0;
    let n = arr.length;
    let map = {};
    let count = 0; // count of different integer in that window

    while (end < n) {
        map[arr[end]] = (map[arr[end]] || 0) + 1;   // add the freq of that number

        if (map[arr[end]] == 1) {
            count++;
        }

        // decrease the window size 
        while (count == k) {
            goodSubArrCount += n - end;
            map[arr[start]]--;
            if (map[arr[start]] == 0) {
                count--;
            }
            start++;
        }

        // increase the window size till 
        // number of different integer equals to k
        end++;
    }

    // ---------------------------

    start = 0;
    end = 0;
    count = 0;
    for (let key in map) {
        if (map.hasOwnProperty(key)) {
            delete map[key];
        }
    }
    console.log(map); // map = {};
    k++;

    while (end < n) {
        map[arr[end]] = (map[arr[end]] || 0) + 1;   // add the freq of that number

        if (map[arr[end]] == 1) {
            count++;
        }

        // decrease the window size 
        while (count == k) {
            goodSubArrCount -= n - end;
            map[arr[start]]--;
            if (map[arr[start]] == 0) {
                count--;
            }
            start++;
        }

        // increase the window size till 
        // number of different integer equals to k
        end++;
    }

    return goodSubArrCount;

}

let arr = [1, 2, 1, 2, 3];
let k = 2;
console.log(GoodSubArr(arr, k)); // 7