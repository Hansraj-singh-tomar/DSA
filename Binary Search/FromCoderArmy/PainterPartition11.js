// isme har painer ko ek wall milna jaruri nhi hai

function painterPartition(arr, painters, totalWalls) {
    // let start = Math.max(...arr);
    let start = 0;
    let end = 0;
    let ans;
    for (let i = 0; i < totalWalls; i++) {
        if (start < arr[i]) {
            start = arr[i];
        }
        end += arr[i];
    }

    while (start <= end) {
        let mid = Math.floor(start + (end - start) / 2);
        let time = 0;
        let painterCount = 1;

        for (let i = 0; i < totalWalls; i++) {
            time += arr[i];
            if (time > mid) {
                painterCount++;
                time = 0;
                time = arr[i];
            }
        }

        if (painterCount <= painters) {
            ans = mid;
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }

    return ans;
}

let arr = [5, 10, 30, 20, 15];
let painters = 3;
let totalWalls = arr.length;
console.log(painterPartition(arr, painters, totalWalls));