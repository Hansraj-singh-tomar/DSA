function KokoEatingBanana(arr, h) {
    let start = Math.min(...arr);
    let end = Math.max(...arr);
    let ans;
    while (start <= end) {
        let mid = Math.floor(start + (end - start) / 2);

        let totalTime = 0;

        for (let i = 0; i < arr.length; i++) {
            totalTime += Math.ceil(arr[i] / mid); // 0.23 hone par 1 consider karega
        }

        if (totalTime > h) {
            start = mid + 1;
        } else {
            ans = mid;
            end = mid - 1;
        }
    }
    return ans;
}

let arr = [3, 6, 11, 7];
let h = 8;
console.log(KokoEatingBanana(arr, h));  // 4