function insertInterval(intervals, newInterval) {
    let result = [];
    for (let interval of intervals) {
        // will check right most 
        if (interval[1] < newInterval[0]) { // No overlapping intervals
            result.push(interval)
        } else if (interval[0] > newInterval[1]) { // No overlapping intervals
            result.push(newInterval)
            newInterval = interval // Update the newInterval to the next interval
        } else {
            newInterval[0] = Math.min(newInterval[0], interval[0]); // Update the newInterval to the next interval
            newInterval[1] = Math.max(interval[1], newInterval[1]); // Merge the intervals
        }
    }

    result.push(newInterval); // Push the last newInterval to the result
    return result;
}

let intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]];
let newInterval = [4, 8];
console.log(insertInterval(intervals, newInterval)); // [[1,2], [3, 10], [12, 16]]