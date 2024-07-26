function mergeIntervals(intervals) {
    intervals = intervals.sort((a, b) => a[0] - b[0])
    let pair = intervals[0];
    let result = [];
    for (let interval of intervals) {
        if (pair[1] >= interval[0]) {
            pair[1] = Math.max(interval[1], pair[1])
        } else {
            result.push(pair);
            pair = interval;
        }
    }
    result.push(pair)
    return result;
}

let intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
console.log(mergeIntervals(intervals)); // [[1,6], [8,10], [15,18]]