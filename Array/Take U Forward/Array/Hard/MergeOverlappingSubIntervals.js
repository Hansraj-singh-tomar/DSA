// merge overlapping subIntervals

function mergeIntervals(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);

    let pair = intervals[0];
    let ans = [];

    for (let interval of intervals) {
        if (pair[1] >= interval[0]) {
            pair[1] = Math.max(pair[1], interval[1])
        } else {
            ans.push(pair);
            pair = interval;
        }
    }
    ans.push(pair);
    return ans;
}

let intervals = [[1, 3], [2, 6], [8, 9], [9, 11], [8, 10], [2, 4], [15, 18], [16, 17]];
console.log(mergeIntervals(intervals)); // [[1,6], [8,11], [15,18]]
