// 713: subarray product less than k
// home work :- count subarrays with score less than k
function subArrProductLessThanK(arr, k) {
    let start = 0;
    let end = 0;
    let product = 1;
    let count = 0;
    while (end < arr.length) {
        product *= arr[end]

        while (product >= k && start <= end) {
            product /= arr[start];
            start++;
        }
        count += ((end - start) + 1);
        end++;
    }
    return count;
}

let arr = [2, 5, 10, 8, 100, 1000, 5, 15];
let k = 999;
console.log(subArrProductLessThanK(arr, k)); // 15 // [2], [2,5], [2, 5, 10] .... so on